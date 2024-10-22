import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AboutService } from 'src/app/Services/about.service';
import { ContactusService } from 'src/app/Services/contactus.service';
@Component({
  selector: 'app-manageabout',
  templateUrl: './manageabout.component.html',
  styleUrls: ['./manageabout.component.css']
})
export class ManageaboutComponent implements OnInit {
  selectedElementId: number | null = null; // Initialize selected element ID

  @ViewChild('callDeleteDailog') deleteDialog !: TemplateRef<any>;
  @ViewChild('callCreateDailog') createDialog !: TemplateRef<any>;
  @ViewChild('callUpdateDailog') updateDialog !: TemplateRef<any>;

  constructor(
    public about: AboutService,
    public dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {

    this.about.GetAllAboutUsElements();
    this.about.GetSelectedAboutus();
    await this.about.GetSelectedAboutus(); 

    if (this.about.selectedAboutus) {
      this.selectedElementId = this.about.selectedAboutus.aboutus_Page_Id;
      console.log(this.selectedElementId);
    } else {
      console.error('No selected element found');
    }
  }
  CreateAbout: FormGroup = new FormGroup({
    image1: new FormControl('', Validators.required),
    image2: new FormControl('', Validators.required),
    text1: new FormControl('', Validators.required),
    text2: new FormControl('', Validators.required),
    text3: new FormControl('', Validators.required),
    image3: new FormControl('', Validators.required),
    image4: new FormControl('', Validators.required),
    text5: new FormControl('', Validators.required),
    text6: new FormControl('', Validators.required),
    text7: new FormControl('', Validators.required)
  });
  openDeleteDialog(id: number) {
    console.log(id);
    const dailogRef = this.dialog.open(this.deleteDialog).afterClosed().subscribe((res) => {
      if (res != undefined) {
        console.log(res)
        if (res == 'yes')
          this.about.DeleteAboutUsElements(id);
      } else if (res == 'no')
        console.log('Thank you');
    }
    );
  }

  openCreateDialog() {
    this.dialog.open(this.createDialog)
  }

  save() {
    this.about.CreateAboutUsElements(this.CreateAbout.value)
    console.log(this.CreateAbout.value);
  }

  onElementSelect(id: number) {
    this.selectedElementId = id; // Update the selected element ID
    this.about.UpdateSelectedAboutus(id);
  }
  UpdateAbout: FormGroup = new FormGroup({
    aboutus_Page_Id: new FormControl('', Validators.required),
    image1: new FormControl('', Validators.required),
    image2: new FormControl('', Validators.required),
    text1: new FormControl('', Validators.required),
    text2: new FormControl('', Validators.required),
    text3: new FormControl('', Validators.required),
    image3: new FormControl('', Validators.required),
    image4: new FormControl('', Validators.required),
    text5: new FormControl('', Validators.required),
    text6: new FormControl('', Validators.required),
    text7: new FormControl('', Validators.required)
    });

  pData: any = {};
  openEditDailog(obj: any) {
    this.pData = obj;
    this.about.imageStorage['image1']=this.pData.image1;
    this.about.imageStorage['image2']=this.pData.image2;
    this.about.imageStorage['image3']=this.pData.image3;
    this.about.imageStorage['image4']=this.pData.image4;

    console.log(this.pData);
    this.UpdateAbout.controls['aboutus_Page_Id'].setValue(this.pData.aboutus_Page_Id)
    this.dialog.open(this.updateDialog)
  }

  save2() {
    this.about.UpdateAbout(this.UpdateAbout.value)
  }

  uploadImage(file: any, apiPath: string, imageNum: string) {
    console.log(file.length === 0);
    if (file.length === 0) return;
    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this.about.UploadAttachment(formData, apiPath, imageNum);
  }
  
  uploadImage1(file: any) {
    this.uploadImage(file, 'uploadImage1', 'image1');
  }
  
  uploadImage2(file: any) {
    this.uploadImage(file, 'uploadImage2', 'image2');
  }
  
  uploadImage3(file: any) {
    this.uploadImage(file, 'uploadImage3', 'image3');  
  }
  
  uploadImage4(file: any) {
    this.uploadImage(file, 'uploadImage4', 'image4');  
  }
  
}