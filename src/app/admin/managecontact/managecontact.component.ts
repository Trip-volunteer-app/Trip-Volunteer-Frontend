import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactusService } from 'src/app/Services/contactus.service';

@Component({
  selector: 'app-managecontact',
  templateUrl: './managecontact.component.html',
  styleUrls: ['./managecontact.component.css']
})
export class ManagecontactComponent implements OnInit {
  @ViewChild('callDeleteDialog') deleteDialog !: TemplateRef<any>;
  constructor(
    public contact: ContactusService,
    public dialog: MatDialog) { }
  ngOnInit(): void {

    // Fetch contact data during initialization
    this.contact.getAllContactElements();
    this.contact.getWebsiteInfo();
  }
  openDeleteDialog(id: number) {
    console.log(id);
    const dailogRef = this.dialog.open(this.deleteDialog).afterClosed().subscribe((res) => {
      if (res !=undefined) {
        console.log(res)
        if (res == 'Y')
          this.contact.deleteWebsiteInfo(id);
      } else if (res == 'N')
        console.log('Thank you');
    }
    );

  }
}