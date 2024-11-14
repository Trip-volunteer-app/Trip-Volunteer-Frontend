import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @ViewChild('callCreateDailog') CreateDailog !: TemplateRef<any>;
  @ViewChild('callDeleteDailog') DeleteDailog !: TemplateRef<any>;
  @ViewChild('callEditDailog') EditDailog !: TemplateRef<any>;


  constructor(public admin: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.admin.getAllCategories();
  }

  Category: FormGroup = new FormGroup({
    category_Name: new FormControl('', Validators.required)
  })

  openCreateDialog() {
    this.dialog.open(this.CreateDailog)
  }


  save() {
    this.admin.CreateCategories(this.Category.value)
  }


  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(this.DeleteDailog).afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes')
          this.admin.DeleteCategories(id);
        else if (result == 'no')
          console.log('Thank you ');
      }
    })
  }

  Category2: FormGroup = new FormGroup({
    category_Id: new FormControl(),
    category_Name: new FormControl('', Validators.required)
  })

  pData: any = {};
  openEditDailog(obj: any) {
    this.pData = obj;
    this.Category2.controls['category_Id'].setValue(this.pData.category_Id)
    this.dialog.open(this.EditDailog)
  }

  save2() {
    this.admin.updateCategories(this.Category.value)
  }
}

