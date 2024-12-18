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
    
     this.route.paramMap.subscribe( params => {
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
           // Check if payment is already made
      if (this.home.BookingPayment?.payment_Status === 'paid') {
        Swal.fire({
          title: 'Error!',
          text: 'You have already paid for this booking.',
          icon: 'error',
          confirmButtonText: 'Ok!',
        });
        console.error("Payment already made.");
        this.selectedCardIndex = null;
        this.selectedCard = null;
        return;
      }

      // Check if the trip has available spots
      if (this.home.BookingPayment?.max_number_of_users == 0) {
        Swal.fire({
          title: 'Sorry!',
          text: 'The trip is full. No more reservations can be made.',
          icon: 'warning',
          confirmButtonText: 'Ok!',
        });
        console.error("The trip is full.");
        this.selectedCardIndex = null;
        this.selectedCard = null;
        return;
      }
  
     if(this.home.BookingPayment.numberOfUser > this.home.BookingPayment.max_number_of_users)
      {
        Swal.fire({
          title: 'Sorry!',
          text: 'The number of available seats in this trip is not sufficient to complete the booking.',
          icon: 'warning',
          confirmButtonText: 'Ok!',
        });
        this.selectedCardIndex = null;
        this.selectedCard = null;
        return;
      }


      console.log("payObj", obj.value);
      const payDetails = obj.value;
  
      // Find matching card
      const matchingCard = this.home.BankCard.find((card: any) =>
        card.card_Number === payDetails.card_number &&
        card.expiration_Date === payDetails.expiry_date &&
        card.cvv === payDetails.cvv &&
        card.full_Name === payDetails.cardholder_name
      );
  
      if (!matchingCard) {
        Swal.fire({
          title: 'Error!',
          text: 'Card not found. Please check your details or add a new card!',
          icon: 'error',
          confirmButtonText: 'Ok!',
        });
        console.error("No matching card found.");
        this.selectedCardIndex = null;
        this.selectedCard = null;
        return;
      }
  
      // Check for sufficient funds
      if (matchingCard.balance < payDetails.total_amount) {
        Swal.fire({
          title: 'Error!',
          text: 'Insufficient funds. Please check your balance.',
          icon: 'error',
          confirmButtonText: 'Ok!',
        });
        console.error("Insufficient funds.");
        this.selectedCardIndex = null;
        this.selectedCard = null;
        return;
      }
  
      // Deduct balance
      matchingCard.balance -= payDetails.total_amount;
      const NewData = {
        bank_Id: matchingCard.bank_Id,
        balance: matchingCard.balance,
        cvv: matchingCard.cvv,
      };
  
      // Update balance and payment status
      await this.home.UpdateBalance(NewData).catch(error => {
        console.error("Error updating balance:", error);
        throw new Error("Failed to update balance.");
      });
  
      const email = localStorage.getItem('email');
      const emailData = {
        booking_Id: this.id,
        Email: email,
        Trip_Name: this.home.tripDetails?.trip_Name,
        Start_Date: this.home.tripDetails?.start_Date,
        End_Date: this.home.tripDetails?.end_Date,
        Departure_Location: this.home.tripDetails?.departure_Location,
        Destination_Location: this.home.tripDetails?.Destination_Location,
        Services: this.home.tripDetails?.services,
      };
  
      await this.home.UpdatePaymentStatus(emailData).catch(error => {
        console.error("Error updating payment status:", error);
        throw new Error("Failed to update payment status.");
      });
  
      const id = this.home.BookingPayment.trip_Id;
      const res_num = this.home.BookingPayment.numberOfUser;
      await this.home.updateMaxUser(id, res_num).catch(error => {
        console.error("Error updating Max User:", error);
        throw new Error("Failed to update Max User.");
      });
  
      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Payment has been made successfully! Reservation Confirmed! THANKS FOR CHOOSING US ♥',
        icon: 'success',
        confirmButtonText: 'Ok!',
      });
      this.selectedCardIndex = null;
      this.selectedCard = null;
  
    } catch (error) {
      console.error("Error in pay function:", error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue processing your payment. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Ok!',
      });
      this.selectedCardIndex = null;
      this.selectedCard = null;
    }
  }
  
}  
