import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { StyleService } from '../Services/style.service';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit, AfterViewChecked {
  private isViewInitialized = false;
  constructor(
    public home: HomeService,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.home.GetAllAboutUsElements();


    this.isViewInitialized = true;
    this.styleService.applyFullHeight(); // Apply height initially
  }

  ngAfterViewChecked(): void {
    if (this.isViewInitialized) {
      this.styleService.applyFullHeight(); // Ensure height recalculates
      this.cdr.detectChanges(); // Prevent Angular change detection errors
    }
  }
}