import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AboutService } from 'src/app/Services/about.service';

@Component({
  selector: 'app-manageabout',
  templateUrl: './manageabout.component.html',
  styleUrls: ['./manageabout.component.css']
})
export class ManageaboutComponent implements OnInit {
  selectedElementId: number | null = null;

  @ViewChild('callDeleteDailog') deleteDialog !: TemplateRef<any>;
  @ViewChild('callCreateDailog') createDialog !: TemplateRef<any>;
  @ViewChild('callUpdateDailog') updateDialog !: TemplateRef<any>;

  tabViews = [
    { label: 'Images', columns: ['hero_image', 'image1', 'image2', 'image3', 'image4', 'image5', 'image6'] },
    { label: 'Content', columns: ['title', 'header', 'text1'] },
    { label: 'Features', columns: ['feature1_header', 'feature1', 'feature2_header', 'feature2', 'feature3_header', 'feature3', 'feature4_header', 'feature4'] },
    { label: 'About Us', columns: ['header2', 'title2', 'aboutus'] },
    { label: 'Feedback', columns: ['feedbackTitle', 'feedbackHeader', 'feedback_background'] },
  ];

  constructor(
    public about: AboutService,
    public dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    this.about.GetAllAboutUsElements();
    await this.about.GetSelectedAboutus();
    if (this.about.selectedAboutus) {
      this.selectedElementId = this.about.selectedAboutus.aboutus_Page_Id;
      console.log(this.selectedElementId);
    } else {
      console.error('No selected element found');
    }
  }

  CreateAbout: FormGroup = new FormGroup({
      hero_image: new FormControl('', Validators.required),
      image1: new FormControl('', Validators.required),
      image2: new FormControl('', Validators.required),
      image3: new FormControl('', Validators.required),
      image4: new FormControl('', Validators.required),
      image5: new FormControl('', Validators.required),
      image6: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      header: new FormControl('', Validators.required),
      text1: new FormControl('', Validators.required),
      feature1_header: new FormControl('', Validators.required),
      feature1: new FormControl('', Validators.required),
      feature2_header: new FormControl('', Validators.required),
      feature2: new FormControl('', Validators.required),
      feature3_header: new FormControl('', Validators.required),
      feature3: new FormControl('', Validators.required),
      feature4_header: new FormControl('', Validators.required),
      feature4: new FormControl('', Validators.required),
      header2: new FormControl('', Validators.required),
      header3: new FormControl('', Validators.required),
      title2: new FormControl('', Validators.required),
      aboutus: new FormControl('', Validators.required),
      feedbackTitle: new FormControl('', Validators.required),
      feedbackHeader: new FormControl('', Validators.required),
      feedback_background: new FormControl('', Validators.required),
    });

  openCreateDialog() {
    this.dialog.open(this.createDialog)
  }

  save() {
    this.about.CreateAboutUsElements(this.CreateAbout.value)
  }

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

  onElementSelect(id: number) {
    this.selectedElementId = id;
    this.about.UpdateSelectedAboutus(id);
  }

  UpdateAbout: FormGroup = new FormGroup({
    aboutus_Page_Id: new FormControl('', Validators.required),
    hero_image: new FormControl('', Validators.required),
    image1: new FormControl('', Validators.required),
    image2: new FormControl('', Validators.required),
    image3: new FormControl('', Validators.required),
    image4: new FormControl('', Validators.required),
    image5: new FormControl('', Validators.required),
    image6: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    header: new FormControl('', Validators.required),
    text1: new FormControl('', Validators.required),
    feature1_header: new FormControl('', Validators.required),
    feature1: new FormControl('', Validators.required),
    feature2_header: new FormControl('', Validators.required),
    feature2: new FormControl('', Validators.required),
    feature3_header: new FormControl('', Validators.required),
    feature3: new FormControl('', Validators.required),
    feature4_header: new FormControl('', Validators.required),
    feature4: new FormControl('', Validators.required),
    header2: new FormControl('', Validators.required),
    header3: new FormControl('', Validators.required),
    title2: new FormControl('', Validators.required),
    aboutus: new FormControl('', Validators.required),
    feedbackTitle: new FormControl('', Validators.required),
    feedbackHeader: new FormControl('', Validators.required),
    feedback_background: new FormControl('', Validators.required),
    });

  pData: any = {};
  openEditDailog(obj: any) {
    console.log('objobjobjobjobjobjobjobjobjobjobjobjobjobjobj',obj);
    this.pData = obj;
    this.about.imageStorage['hero_image'] = this.pData.hero_image;
    this.about.imageStorage['image1'] = this.pData.image1;
    this.about.imageStorage['image2'] = this.pData.image2;
    this.about.imageStorage['image3'] = this.pData.image3;
    this.about.imageStorage['image4'] = this.pData.image4;
    this.about.imageStorage['image5'] = this.pData.image5;
    this.about.imageStorage['image6'] = this.pData.image6;
    this.about.imageStorage['feedback_background'] = this.pData.feedback_background;

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
  uploadHeroImage(file: any) {
    this.uploadImage(file, 'uploadHeroImage', 'hero_image');
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

  uploadImage5(file: any) {
    this.uploadImage(file, 'uploadImage5', 'image5');
  }

  uploadImage6(file: any) {
    this.uploadImage(file, 'uploadImage6', 'image6');
  }
  uploadImage7(file: any) {
    this.uploadImage(file, 'uploadFeedbackBackground', 'feedback_background');
  }
}