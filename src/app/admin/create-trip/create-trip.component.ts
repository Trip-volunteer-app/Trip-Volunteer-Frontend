import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent {

    constructor(public admin: AdminService,private router:Router) {}


      ngOnInit(): void {
    this.admin.getAllCategories();
  }

  firstFormGroup : FormGroup = new FormGroup({ 
    categoryControl: new FormControl ('', Validators.required), // Form control for category selection
  });
  
  secondFormGroup: FormGroup = new FormGroup({ // Fixed the initialization of secondFormGroup
    Trip_Name: new FormControl('', Validators.required),
    Trip_Price: new FormControl('', [Validators.required, Validators.min(0)]),
    Start_Date: new FormControl ('', Validators.required),
    End_Date: new FormControl ('', Validators.required),
    Max_Number_Of_Volunteers: new FormControl ('', [Validators.required, Validators.min(0)]),
    Max_Number_Of_Users: new FormControl ('', [Validators.required, Validators.min(0)]),
    description: new FormControl ('', Validators.required),
  });

  selectedCategoryId: number | null = null;

  onCategoryChange(event: any): void {
    this.selectedCategoryId = event.value; // Update selected category on change
    console.log(this.selectedCategoryId); // Log the selected category ID
  }
  validateAndNext(stepper: MatStepper): void {
    // Mark all fields as touched to trigger validation
    this.secondFormGroup.markAllAsTouched();
    
    if (this.secondFormGroup.valid) {
      this.onSubmit();
      stepper.next(); // Navigate to the next step if the form is valid
    }
  }
 
  TripImage:FormGroup = new FormGroup({
    image_Name:new FormControl('',Validators.required),
  })

  uploadImage(file:any){
    if(file.length==0)
      return;
    let fileToUpload=<File>file[0];
    const formData = new FormData();
    formData.append('file',fileToUpload,fileToUpload.name)
    this.admin.uploadTripImage(formData);
  }
   onSubmit(): void {
    if (this.secondFormGroup.valid) {
      const tripData = {
        ...this.secondFormGroup.value,
        Category_Id: this.selectedCategoryId, // Include selected category ID
        image_Name:this.TripImage.value
      };
      this.admin.CreateTrip(tripData);
      console.log('Form Submitted:', tripData);
      // Perform your form submission logic here
    }
  }
  back(){
    this.router.navigate(['admin/TripsInformation']);

  }
}
