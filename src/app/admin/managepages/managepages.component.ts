import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ContactusService } from 'src/app/Services/contactus.service';

@Component({
  selector: 'app-managepages',
  templateUrl: './managepages.component.html',
  styleUrls: ['./managepages.component.css'],
})
export class ManagepagesComponent {
  constructor(
    public contact: ContactusService) { }
  ngOnInit(): void {
    // Fetch contact data during initialization
    this.contact.getAllContactElements();
    this.contact.getWebsiteInfo();
  }
}