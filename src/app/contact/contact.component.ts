import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from '../Services/contactus.service';
import { StyleService } from '../Services/style.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AdminService } from '../Services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, AfterViewInit {
  isSubmitting: boolean = false;

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
    public toast: ToastrService,
    public home: HomeService
  ) { }

  ngOnInit(): void {
    this.contact.GetSelectedElement();
    this.contact.GetSelectedWebsiteInfo();
    this.styleService.applyFullHeight();
    this.home.GetAllTeam();
  }

  ngAfterViewInit(): void {
    this.styleService.applyFullHeight();
    this.styleService.initCarousels();
    this.styleService.handleDropdownHover();
    this.styleService.handleScrollAnimations();
    this.styleService.initCounters();
    this.styleService.initContentAnimations();
    this.styleService.initMagnificPopup();
    this.styleService.initDatePickers();
    this.cdr.detectChanges();
  }

  sanitizeInput(input: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(input);
  }

  onSubmit(): void {
    if (this.CreateContact.valid) {
      const formData = this.CreateContact.value;
      this.contact.createContactForm(formData);
      this.CreateContact.reset();
      const email = formData.email;
      this.sendEmailNotification(email);
    }
  }

  sendEmailNotification(email: string) {
    this.contact.sendEmailContact(email).subscribe(response => {
      this.toast.success('Successufly Send Contact');
    }, error => {
    });
  }
}