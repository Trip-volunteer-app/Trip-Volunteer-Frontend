import { Component,OnInit,ViewChild,TemplateRef } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { HomeService } from '../Services/home.service';
import {  FormGroup, FormControl,Validators } from '@angular/forms';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{

  @ViewChild('callSaveDailog') SaveDailog !:TemplateRef<any>;  
  @ViewChild('callpayDailog') payDailog !:TemplateRef<any>;  

  id!: number;
  constructor(
    public home:HomeService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
      console.log("id:", this.id);
      if (this.id) {
        this.home.GetBookingById(this.id);
      }
    });

  const userFromStorage = localStorage.getItem("user");
  const user = userFromStorage ? JSON.parse(userFromStorage) : null;
  const loginId = user ? Number(user.loginid) : null; // Corrected line

  if (loginId !== null) {
    this.home.GetCardByLoginId(loginId);
  }

  this.home.getALLBank();

  }
  selectedCardIndex: number | null = null;
  selectedCard: any = null;
  dialogRef!: MatDialogRef<any>;

 
  cardForm:FormGroup = new FormGroup({
    card_number:new FormControl('',Validators.required),
    expiry_date:new FormControl('',Validators.required),
    cvv:new FormControl('',Validators.required),
    cardholder_name: new FormControl('',Validators.required),
    total_amount: new FormControl('',Validators.required),
  })
  pData:any;
  onCardSelect(card: any): void {
    this.selectedCard = card;
    const dialogRef = this.dialog.open(this.payDailog, {
      data: { card },
      disableClose: true 
    });
    this.pData=card;
    console.log("pData",this.pData)
    this.cardForm.controls['card_number'].setValue(this.pData.card_number)
    this.cardForm.controls['expiry_date'].setValue(this.pData.expiry_date)
    this.cardForm.controls['cardholder_name'].setValue(this.pData.cardholder_name)
    this.cardForm.controls['cardholder_name'].setValue(this.pData.cardholder_name)


    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        if(result == 'yes'){
          this.pay(this.cardForm);
        }
      if (result === 'no') {
        this.selectedCardIndex = null;
        this.selectedCard = null;
      }
    }else{
      this.selectedCardIndex = null;
      this.selectedCard = null;
    }
    });
  }

  onCancel(): void {
    this.dialogRef.close('no');
  }

  onConfirm(): void {
    this.dialogRef.close('yes'); 
  } 
  paymentForm:FormGroup = new FormGroup({
    card_number:new FormControl('',Validators.required),
    expiry_date:new FormControl('',Validators.required),
    cvv:new FormControl('',Validators.required),
    cardholder_name: new FormControl('',Validators.required),
    total_amount: new FormControl('',Validators.required),
  })

  openSaveDialog() {
    const dialogRef = this.dialog.open(this.SaveDailog).afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const userFromStorage = localStorage.getItem("user");
        const user = userFromStorage ? JSON.parse(userFromStorage) : null;
        const userId = user ? Number(user.loginid) : null; // Ensure userId is valid
  
        const body = {
          cardholder_Name: this.paymentForm.get('cardholder_name')?.value,
          card_Number: this.paymentForm.get('card_number')?.value,
          expiry_Date: this.paymentForm.get('expiry_date')?.value,
          login_Id: userId
        };
  
        this.pay(this.paymentForm)
        .then(() => {
          console.log('Payment processed successfully.');

          if (result === 'yes') {
            return this.home.SaveCard(body);
          } else {
            console.log('Thank you, not saving the card.');
            return Promise.resolve(); 
          }
        })
        .then(() => {
          if (result === 'yes') {
            console.log('Card saved successfully.');
            this.selectedCardIndex = null;
            this.selectedCard = null;
          }
        })
        .catch(error => {
          console.error('Error processing payment or saving card:', error);
          this.selectedCardIndex = null;
          this.selectedCard = null;
        });
    }
  });
  }

  async pay(obj: any): Promise<void> {
    try {
      if (!this.home || !this.home.BankCard) {
        Swal.fire({ title: 'Error!', text: 'Your visa Card information is missing.', icon: 'error', confirmButtonText: 'Ok!' });
        console.log("BankCard information is missing.");
        throw new Error("BankCard information is missing.");
      }
  
      if (this.home.BookingPayment.payment_Status === 'paid') {
        Swal.fire({ title: 'Error!', text: 'You already paid.', icon: 'error', confirmButtonText: 'Ok!' });
        throw new Error("You already paid.");
      }
  
      console.log("payObj", obj.value);
      const payDetails = obj.value;
      const matchingCard = this.home.BankCard.find((card: any) =>
        card.card_Number === payDetails.card_number &&
        card.expiration_Date === payDetails.expiry_date &&
        card.cvv === payDetails.cvv &&
        card.full_Name === payDetails.cardholder_name
      );
  
      if (!matchingCard) {
        Swal.fire({ title: 'Error!', text: 'Card not found. Please check your details or add a new card!', icon: 'error', confirmButtonText: 'Ok!' });
        throw new Error("No matching card found.");
      }
  
      if (matchingCard.balance < payDetails.total_amount) {
        Swal.fire({ title: 'Error!', text: 'Insufficient funds. Please check your balance.', icon: 'error', confirmButtonText: 'Ok!' });
        throw new Error("Insufficient funds.");
      }
  
      // Deduct balance
      matchingCard.balance -= payDetails.total_amount;
      const NewData = {
        bank_Id: matchingCard.bank_Id,
        balance: matchingCard.balance,
        cvv: matchingCard.cvv
      };
  
      // Update balance and payment status, then send email
      await this.home.UpdateBalance(NewData);
      await this.home.UpdatePaymentStatus({ booking_Id: this.id });
  
      // Retrieve necessary details and send email
      await this.home.GetBookingById(this.id);
      await this.home.getTripById(this.home.BookingPayment.trip_Id);
  
      const email = localStorage.getItem('email');
      const paymentStatus = this.home.BookingPayment.payment_Status;
      const emailData = {
        Email: email,
        Status: paymentStatus,
        Trip_Name: this.home.tripDetails.trip_Name,
        Start_Date:this.home.tripDetails.start_Date,
        End_Date:this.home.tripDetails.end_Date,
        Departure_Location:this.home.tripDetails.departure_Location,
        Destination_Location:this.home.tripDetails.Destination_Location,
        Services:this.home.tripDetails.services
      };
  
      // Send email and handle response
      this.home.sendEmail(emailData).subscribe(
        response => console.log("Email sent successfully", response),
        error => console.error("Error sending email:", error)
      );
  
      Swal.fire({ title: 'Success!', text: 'Payment has been made successfully! Reservation Confirmed! THANKS FOR CHOOSING US ♥', icon: 'success', confirmButtonText: 'Ok!' });
    } catch (error) {
      console.error("Error in pay function:", error);
      Swal.fire({ title: 'Error!', text: 'There was an issue processing your payment. Please try again later.', icon: 'error', confirmButtonText: 'Ok!' });
    }
  }
  
  
}  
