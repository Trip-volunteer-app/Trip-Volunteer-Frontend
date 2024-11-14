import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-manage-testimonial',
  templateUrl: './manage-testimonial.component.html',
  styleUrls: ['./manage-testimonial.component.css']
})
export class ManageTestimonialComponent implements OnInit {
  @ViewChild('callDeleteDailog') DeleteDailog !: TemplateRef<any>;
  @ViewChild('callEditDailog') EditDailog !: TemplateRef<any>;


  constructor(public admin: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.admin.getALLTestimonial();
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes')
          this.admin.DeleteTestimonial(id);
        else if (result == 'no')
          console.log('Thank you ');
      }
    })

  }
  Testimonial: FormGroup = new FormGroup({
    testimonial_Id: new FormControl(''),
    login_Id: new FormControl('', Validators.required),
    case: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    feedback: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    create_At: new FormControl('', Validators.required)
  })

  pData: any = {};
  statusList: string[] = ['Pending', 'Accepted', 'Rejected'];
  openEditDailog(obj: any) {
    this.pData = obj;
    this.dialog.open(this.EditDailog)
  }

  save2() {
    this.admin.updateTestimonial(this.Testimonial.value);
  }

  disableField(event: Event) {
    const inputField = event.target as HTMLInputElement;
    inputField.disabled = true;
  }
}