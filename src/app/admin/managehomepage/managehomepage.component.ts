import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AboutService } from 'src/app/Services/about.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-managehomepage',
  templateUrl: './managehomepage.component.html',
  styleUrls: ['./managehomepage.component.css']
})
export class ManagehomepageComponent implements OnInit {
  selectedElementId: number | null = null; // Initialize selected element ID

  @ViewChild('callDeleteDialog') deleteDialog !: TemplateRef<any>;
  @ViewChild('callCreateDialog') createDialog !: TemplateRef<any>;
  @ViewChild('callUpdateDialog') updateDialog !: TemplateRef<any>;

  constructor(
    public home: HomeService,
    public dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    this.home.GetAllHomePageElements();
    await this.home.GetSelectedHomeElement();
    if (this.home.selectedHome) {
      this.selectedElementId = this.home.selectedHome.home_Page_Id;
      console.log(this.selectedElementId);
    } else {
      console.error('No selected element found');
    }
  }

  CreateHomeElements: FormGroup = new FormGroup({
    hero_Image: new FormControl('', Validators.required),
    image1: new FormControl('', Validators.required),
    image2: new FormControl('', Validators.required),
    image3: new FormControl('', Validators.required),
    header: new FormControl('', Validators.required),
    text1: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
  });

  openCreateDialog() {
    this.dialog.open(this.createDialog)
  }

  save() {
    this.home.CreateHomePageElements(this.CreateHomeElements.value)
  }

  openDeleteDialog(id: number) {
    console.log(id);
    const dailogRef = this.dialog.open(this.deleteDialog).afterClosed().subscribe((res) => {
      if (res != undefined) {
        console.log(res)
        if (res == 'yes')
          this.home.DeleteHomePageElements(id);
      } else if (res == 'no')
        console.log('Thank you');
    }
    );
  }

  onElementSelect(id: number) {
    this.selectedElementId = id;
    console.log('#################################', id)
    this.home.UpdateSelectedHomeElement(id);
  }

  UpdateHomeElements: FormGroup = new FormGroup({
    home_Page_Id: new FormControl('', Validators.required),
    hero_Image: new FormControl('', Validators.required),
    image1: new FormControl('', Validators.required),
    image2: new FormControl('', Validators.required),
    image3: new FormControl('', Validators.required),
    header: new FormControl('', Validators.required),
    text1: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
  });

  pData: any = {};
  openEditDialog(obj: any) {
    this.pData = obj;
    this.home.imageStorage['hero_Image'] = this.pData.hero_Image;
    this.home.imageStorage['image1'] = this.pData.image1;
    this.home.imageStorage['image2'] = this.pData.image2;
    this.home.imageStorage['image3'] = this.pData.image3;
    console.log(this.pData);
    this.UpdateHomeElements.controls['home_Page_Id'].setValue(this.pData.home_Page_Id)
    this.dialog.open(this.updateDialog)
  }

  save2() {
    console.log('lololololololo',this.UpdateHomeElements.value);
    this.home.UpdateHopmePageElements(this.UpdateHomeElements.value)
  }

  uploadImage(file: any, apiPath: string, imageNum: string) {
    console.log(file.length === 0);
    if (file.length === 0) return;
    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this.home.UploadAttachment(formData, apiPath, imageNum);
  }

  uploadHeroImage(file: any) {
    this.uploadImage(file, 'uploadHeroImg', 'hero_Image');
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
}