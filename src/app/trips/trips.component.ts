import { TripsService } from 'src/app/Services/trips.service';
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { StyleService } from '../Services/style.service';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent   implements OnInit, AfterViewChecked {
  private isViewInitialized = false;

  constructor(
    private styleService: StyleService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Fetch data when component initializes

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
