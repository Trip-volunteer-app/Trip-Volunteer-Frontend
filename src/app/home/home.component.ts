import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { StyleService } from '../Services/style.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , AfterViewChecked {
  private isViewInitialized = false;

  constructor(   
    private styleService: StyleService,
    private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
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
