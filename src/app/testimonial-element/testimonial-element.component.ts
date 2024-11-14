import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { StyleService } from '../Services/style.service';
import { HomeService } from '../Services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { TestimonalComponent } from '../testimonal/testimonal.component';

@Component({
  selector: 'app-testimonial-element',
  templateUrl: './testimonial-element.component.html',
  styleUrls: ['./testimonial-element.component.css']
})
export class TestimonialElementComponent implements OnInit, AfterViewInit {
  @ViewChild('carouselTestimony', { static: true }) carouselTestimony!: ElementRef;
  constructor(
    public home: HomeService,
    private styleService: StyleService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.styleService.applyFullHeight();
    this.home.GetSelectedAboutus();
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

  activeTestimonial: number = 0;
  get visibleTestimonials() {
    const testimonials = this.home.Testimonial;
    const prev = (this.activeTestimonial + testimonials.length - 1) % testimonials.length;
    const next = (this.activeTestimonial + 1) % testimonials.length;
    return [
      testimonials[prev],
      testimonials[this.activeTestimonial],
      testimonials[next]
    ];
  }
  scrollLeft() {
    this.activeTestimonial = (this.activeTestimonial + this.home.Testimonial.length - 1) % this.home.Testimonial.length;
  }
  scrollRight() {
    this.activeTestimonial = (this.activeTestimonial + 1) % this.home.Testimonial.length;
  }
  getStarsArray(rating: number): string[] {
    const fullStars = rating;
    const emptyStars = 5 - fullStars;

    return [...Array(fullStars).fill('full'), ...Array(emptyStars).fill('empty')];
  }
}