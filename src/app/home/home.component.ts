import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { StyleService } from '../Services/style.service';
<<<<<<< HEAD
import { HomeService } from '../Services/home.service';
=======
>>>>>>> e0c012b77713b81a99a83c48e90ffad616f009ee

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , AfterViewChecked {
  private isViewInitialized = false;

  constructor(   
<<<<<<< HEAD
    public home: HomeService,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.home.GetAllAboutUsElements();
=======
    private styleService: StyleService,
    private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
>>>>>>> e0c012b77713b81a99a83c48e90ffad616f009ee
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
