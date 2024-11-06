import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AboutService } from 'src/app/Services/about.service';
import { HomeService } from 'src/app/Services/home.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-managehomepage',
  templateUrl: './managehomepage.component.html',
  styleUrls: ['./managehomepage.component.css']
})
export class ManagehomepageComponent implements OnInit {
  selectedElementId: number | null = null; // Initialize selected element ID
  heroImagePreview: string | ArrayBuffer | null | undefined = null;
  logoImagePreview: string | ArrayBuffer | null | undefined = null;

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
    logo_Image: new FormControl('', Validators.required),
    header: new FormControl('', Validators.required),
    text1: new FormControl(''),
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
    this.home.UpdateSelectedHomeElement(id);
  }

  UpdateHomeElements: FormGroup = new FormGroup({
    home_Page_Id: new FormControl('', Validators.required),
    hero_Image: new FormControl(''),
    logo_Image: new FormControl(''),
    header: new FormControl('', Validators.required),
    text1: new FormControl(''),
    title: new FormControl('', Validators.required),
  });

  pData: any = {};
  openEditDialog(obj: any) {
    this.pData = obj;
    this.home.imageStorage['hero_Image'] = this.pData.hero_Image;
    this.home.imageStorage['logo_Image'] = this.pData.logo_Image;
    console.log(this.pData);
    this.UpdateHomeElements.controls['home_Page_Id'].setValue(this.pData.home_Page_Id)
    this.dialog.open(this.updateDialog)
  }

  save2() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to proceed with the booking?',
      icon: 'warning',
      showCancelButton: true,  // Adds a cancel button for confirmation
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, book it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.home.UpdateHopmePageElements(this.UpdateHomeElements.value)
      }
    });
  }

  uploadImage(file: any, apiPath: string, imageNum: string) {
    console.log(file.length === 0);
    if (file.length === 0) return;
    let fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload);
    this.home.UploadAttachment(formData, apiPath, imageNum);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (imageNum === 'hero_Image') {
        this.heroImagePreview = e.target?.result;
        this.CreateHomeElements.get('hero_Image')?.markAsTouched();
      } else if (imageNum === 'logo_Image') {
        this.logoImagePreview = e.target?.result;
        this.CreateHomeElements.get('logo_Image')?.markAsTouched();
      }
    };
    reader.readAsDataURL(fileToUpload);

    this.home.UploadAttachment(formData, apiPath, imageNum)
  }


  uploadHeroImage(file: any) {
    this.uploadImage(file, 'uploadHeroImg', 'hero_Image');
  }

  uploadLogoImg(file: any) {
    this.uploadImage(file, 'uploadImage1', 'logo_Image');
  }
  clearHeroImage(): void {
    this.heroImagePreview = null;
    const control = this.CreateHomeElements.get('hero_Image');
    control?.reset();
    control?.markAsTouched();
}

clearLogoImage(): void {
    this.logoImagePreview = null;
    const control = this.CreateHomeElements.get('logo_Image');
    control?.reset();
    control?.markAsTouched();
}
}