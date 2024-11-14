import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HomeService } from '../Services/home.service';
import { StyleService } from '../Services/style.service';
import { MatDialog } from '@angular/material/dialog';
import { TestimonalComponent } from '../testimonal/testimonal.component';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})

export class AboutusComponent implements OnInit, AfterViewInit {
  constructor(
    public home: HomeService,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.home.GetSelectedAboutus();
    console.log(this.home.GetSelectedAboutus());
    this.styleService.applyFullHeight();
    this.home.GetAcceptedTestimonies();

  }
  ngAfterViewInit(): void {
    this.styleService.applyFullHeight();
    this.styleService.initCarousels();
    this.styleService.handleDropdownHover();
    this.styleService.handleScrollAnimations();
    this.styleService.initCounters();
    this.styleService.initContentAnimations();
    this.styleService.initMagnificPopup();
    this.styleService.initDatePickers();
    this.cdr.detectChanges();
  }

  isTokenPresent(): boolean {
    return !!localStorage.getItem('token');
  }
  openTestimonialDialog() {
    this.dialog.open(TestimonalComponent);
  }
}