import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactusService } from 'src/app/Services/contactus.service';

@Component({
  selector: 'app-managecontact',
  templateUrl: './managecontact.component.html',
  styleUrls: ['./managecontact.component.css']
})
export class ManagecontactComponent implements OnInit {
  selectedElementId: number | null = null; // Initialize selected element ID

  @ViewChild('callDeleteDialog') deleteDialog !: TemplateRef<any>;
  @ViewChild('callCreateDailog') createDialog !: TemplateRef<any>;
  @ViewChild('callUpdateDialog') updateDialog !: TemplateRef<any>;

  constructor(
    public contact: ContactusService,
    public dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {

    this.contact.getAllContactElements();
    await this.contact.GetSelectedElement(); 
    if (this.contact.selectedContactElements) {
      this.selectedElementId = this.contact.selectedContactElements.contactus_Elements_Id;
      console.log(this.selectedElementId);
    } else {
      console.error('No selected element found');
    }
  }

  CreateContact: FormGroup = new FormGroup({
    image1: new FormControl('', Validators.required),
    hero_Img: new FormControl('', Validators.required),
    header: new FormControl('', [Validators.required, Validators.maxLength(30)])
  });

  openCreateDialog() {
    this.dialog.open(this.createDialog)
  }

  save() {
    this.contact.createContactUsElements(this.CreateContact.value)
    console.log(this.CreateContact.value);
  }
  
  openDeleteDialog(id: number) {
    console.log(id);
    const dailogRef = this.dialog.open(this.deleteDialog).afterClosed().subscribe((res) => {
      if (res != undefined) {
        console.log(res)
        if (res == 'yes')
          this.contact.deleteContactUsElements(id);
      } else if (res == 'no')
        console.log('Thank you');
    }
    );
  }

  onElementSelect(id: number) {
    this.selectedElementId = id;
    this.contact.UpdateSelectedElement(id);
  }

  UpdateContact: FormGroup = new FormGroup({
    contactus_Elements_Id: new FormControl('', Validators.required),
    image1: new FormControl('', Validators.required),
    hero_Img: new FormControl('', Validators.required),
    header: new FormControl('', [Validators.required, Validators.maxLength(30)])
    });

  pData: any = {};
  openEditDailog(obj: any) {
    this.pData = obj;
    this.contact.imageStorage['image1']=this.pData.image1;
    this.contact.imageStorage['hero_Img']=this.pData.hero_Img;
    console.log(this.pData);
    this.UpdateContact.controls['contactus_Elements_Id'].setValue(this.pData.contactus_Elements_Id)
    this.dialog.open(this.updateDialog)
  }

  save2() {
    this.contact.UpdateContact(this.UpdateContact.value)
  }

  uploadImage(file: any, apiPath: string, imageNum: string) {
    console.log(file.length === 0);
    if (file.length === 0) return;
    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this.contact.UploadAttachment(formData, apiPath, imageNum);
  }
  
  uploadImage2(file: any) {
    this.uploadImage(file, 'UploadImage', 'image1');
  }
  
  uploadImage1(file: any) {
    this.uploadImage(file, 'uploadImage2', 'hero_Img');
  }
}