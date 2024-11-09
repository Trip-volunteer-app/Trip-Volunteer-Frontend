import { Component, OnInit,ViewChild,TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {MatDialog,MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as SHA256 from 'crypto-js/sha256';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
 
  @ViewChild('callConfirmPassDailog') ConfirmPassDailog !:TemplateRef<any>;  

  constructor(public admin: AdminService, private router: Router,public toastr: ToastrService,public dialog: MatDialog) {}

  BirthDay:any;

  async ngOnInit() {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;

    const userId = Number(user.loginid);
    await this.admin.GetUserinfoByLoginId(userId);
    
    setTimeout(() => {
      if (this.admin.UserInformation && this.admin.UserInformation.birth_Date) {
        this.BirthDay = new Date(this.admin.UserInformation.birth_Date)
        .toLocaleDateString('en-CA');      }
  }, 4000);
  }
  

  Users: FormGroup = new FormGroup({
    login_Id: new FormControl(''),
    email:new FormControl(''),
    first_Name: new FormControl(''),
    last_Name: new FormControl(''),
    phone_Number: new FormControl(''),
    address: new FormControl(''),
    birth_Date: new FormControl(''),
    image_Path: new FormControl(''),
    user_Id: new FormControl(''),
  });

  passwordForm: FormGroup= new FormGroup({
    password: new FormControl('', [Validators.required])
  });

  pData:any;
  dialogRef!: MatDialogRef<any>;

  openConfirmPassDailog(): void {
    this.dialogRef = this.dialog.open(this.ConfirmPassDailog, {
      disableClose: true  
    });
}


 uploadImage(file:any){
    if(file.length==0) 
      return; 
    let fileToUpload=<File> file[0]; 
    const formData = new FormData(); 
    formData.append('file', fileToUpload, fileToUpload.name); 
    this.admin.uploadUserImage(formData); 
  
  }

  saveProfile(): void {
    const enteredPassword = this.passwordForm.get('password')?.value;
  const hashedEnteredPassword = this.hashPassword(enteredPassword);

  if (hashedEnteredPassword === this.admin.UserInformation.password) {
    // Password is correct, proceed with the update
    this.Users.controls['login_Id'].setValue(this.admin.UserInformation.login_Id);
    this.Users.controls['user_Id'].setValue(this.admin.UserInformation.user_Id);
    this.Users.controls['email'].setValue(this.admin.UserInformation.email);

    this.admin.updateUserData(this.Users.value, this.admin.UserInformation.image_Path);
  } else {
    // Show SweetAlert if the password is incorrect
    Swal.fire({
      icon: 'error',
      title: 'Incorrect Password',
      text: 'The password you entered is incorrect. Please try again.',
    });
  }
  }

  hashPassword(password: string): string {
    return SHA256(password).toString();
  }
  


  changePassword: FormGroup = new FormGroup({
    login_Id: new FormControl(''),
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*_-]).*$/)
    ]),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: this.passwordsMatchValidator });
  
  // Custom validator to check if newPassword and confirmPassword match
  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  changedPassword() {
    if (this.changePassword.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'Please ensure all fields are filled correctly and that passwords match.',
        confirmButtonColor: '#f15d30'
      });
      return;
    }


    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;

    const userId = Number(user.loginid);
    const oldPass =this.changePassword.get('oldPassword')?.value;
    const hashedEnteredPassword = this.hashPassword(oldPass);

    if(hashedEnteredPassword == this.admin.UserInformation.password){
      if (userId) {
      const payload = {
        login_Id: userId,
        oldPassword: this.changePassword.get('oldPassword')?.value,
        newPassword: this.changePassword.get('newPassword')?.value,
        confirmPassword: this.changePassword.get('confirmPassword')?.value
      };
  
      console.log("Payload for Change Password:", payload);
  
      this.admin.changePassword(payload);
    }}else{
      Swal.fire({
        icon: 'error',
        title: 'Incorrect Old Password',
        text: 'The current password you entered is incorrect.',
        confirmButtonColor: '#f15d30'
      });
    }
  }


  isPasswordFormVisible: boolean = false; // Controls visibility of the form
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  togglePasswordForm() {
    this.isPasswordFormVisible = !this.isPasswordFormVisible;
  }

  YourTripsAndFavorites(): void {
    this.router.navigate(['UserTrips']);
  }


}
