import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from '../Services/contactus.service';
import { StyleService } from '../Services/style.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AdminService } from '../Services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, AfterViewInit {
  isSubmitting: boolean = false;


  // CreateContact: FormGroup = new FormGroup({
  //   full_Name: new FormControl(''),
  //   email: new FormControl(''),
  //   query: new FormControl(''),
  //   messages: new FormControl('')
  // });

  CreateContact: FormGroup = new FormGroup({
    full_Name: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    query: new FormControl('', [
      Validators.required,
      Validators.maxLength(70),
      Validators.pattern('^[a-zA-Z0-9 ]*$')
    ]),
    messages: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(300)
    ])
  });

  constructor(
    public contact: ContactusService,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    public admin: AdminService,
    public toast : ToastrService
  ) { }

  ngOnInit(): void {
    // Fetch contact elements and website info during initialization
    this.contact.GetSelectedElement();
    this.contact.GetSelectedWebsiteInfo();
    this.styleService.applyFullHeight(); // Apply full height initially
  }

  ngAfterViewInit(): void {
    // Apply styles and initialize components after view initialization
    this.styleService.applyFullHeight();
    this.styleService.initCarousels();
    this.styleService.handleDropdownHover();
    this.styleService.handleScrollAnimations();
    this.styleService.initCounters();
    this.styleService.initContentAnimations();
    this.styleService.initMagnificPopup();
    this.styleService.initDatePickers();
    this.cdr.detectChanges(); // Detect changes after initializations
  }

  sanitizeInput(input: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(input);
  }



onSubmit(): void {
if (this.CreateContact.valid) {
  const formData = this.CreateContact.value;
  console.log('Form Data:', formData);

  // Send form data to createContactForm
  this.contact.createContactForm(formData);

  // Reset the form
  this.CreateContact.reset();

  // Retrieve the email from the form group
  const email = formData.email;

  // Send the email notification with the extracted email
  this.sendEmailNotification(email);
}
}

sendEmailNotification(email: string) {
this.contact.sendEmailContact(email).subscribe(response => {
  console.log("Contact us email sent successfully", response);
  this.toast.success('Successufly Send Contact');
}, error => {
  console.error("Error sending Contact us email", error);
});
}






}