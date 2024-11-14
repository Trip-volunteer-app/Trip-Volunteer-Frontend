import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactusService } from 'src/app/Services/contactus.service';

@Component({
  selector: 'app-manage-website-info',
  templateUrl: './manage-website-info.component.html',
  styleUrls: ['./manage-website-info.component.css']
})
export class ManageWebsiteInfoComponent implements OnInit {
  selectedElementId: number | null = null;

  @ViewChild('callDeleteDialog') deleteDialog !: TemplateRef<any>;
  @ViewChild('callCreateDialog') createDialog !: TemplateRef<any>;
  @ViewChild('callUpdateDialog') updateDialog !: TemplateRef<any>;

  constructor(
    public contact: ContactusService,
    public dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    this.contact.getWebsiteInfo();
    await this.contact.GetSelectedWebsiteInfo();
    if (this.contact.selectedWebsiteInfo) {
      this.selectedElementId = this.contact.selectedWebsiteInfo.website_Id;
    } else {
    }
  }

  CreateWebsiteInfo: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_Number: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    adress: new FormControl('', Validators.required),
    website_Link: new FormControl(''),
    open_Time: new FormControl(''),
    closing_Time: new FormControl(''),
  });

  openCreateDialog() {
    this.dialog.open(this.createDialog)
  }

  save() {
    this.contact.createWebsiteInfo(this.CreateWebsiteInfo.value)
  }

  openDeleteDialog(id: number) {
    const dailogRef = this.dialog.open(this.deleteDialog).afterClosed().subscribe((res) => {
      if (res != undefined) {
        if (res == 'yes')
          this.contact.deleteWebsiteInfo(id);
      }
    }
    );
  }

  onElementSelect(id: number) {
    this.selectedElementId = id;
    this.contact.UpdateSelectedWebsiteInfo(id);
  }

  UpdateWebsiteInfo: FormGroup = new FormGroup({
    website_Id: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_Number: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    adress: new FormControl('', Validators.required),
    website_Link: new FormControl(''),
    open_Time: new FormControl(''),
    closing_Time: new FormControl(''),
  });

  pData: any = {};
  openEditDialog(obj: any) {
    this.pData = obj;
    this.UpdateWebsiteInfo.controls['website_Id'].setValue(this.pData.website_Id)
    this.dialog.open(this.updateDialog)
  }

  save2() {
    this.contact.UpdateWebsiteInfo(this.UpdateWebsiteInfo.value)
  }
}