import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { ContactusService } from '../Services/contactus.service';
import { StyleService } from '../Services/style.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  implements OnInit, AfterViewChecked {
  private isViewInitialized = false;

  constructor(
    public contact: ContactusService,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Fetch data when component initializes
    this.contact.getAllContactElements();
    this.contact.getWebsiteInfo();
    
    this.isViewInitialized = true;
    this.styleService.applyFullHeight(); // Apply height initially
  }

  ngAfterViewChecked(): void {
    if (this.isViewInitialized) {
      this.styleService.applyFullHeight(); // Ensure height recalculates
      this.cdr.detectChanges(); // Prevent Angular change detection errors
    }
  }
}