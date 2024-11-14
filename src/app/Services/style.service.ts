import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { throttleTime } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class StyleService {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  // Apply full height to elements with .js-fullheight class
  applyFullHeight() {
    const elements = this.document.querySelectorAll('.js-fullheight');
    const setHeight = () => {
      const windowHeight = window.innerHeight;
      elements.forEach((el) => {
        this.renderer.setStyle(el, 'height', `${windowHeight}px`);
      });
    };
    setHeight();
    fromEvent(window, 'resize')
      .pipe(debounceTime(100))
      .subscribe(setHeight);
  }

  // Initialize carousels
  initCarousels() {
    const testimonyCarousel = (window as any).jQuery('.carousel-testimony');
    testimonyCarousel.owlCarousel({
      center: true,
      loop: true,
      items: 1,
      margin: 30,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 3 },
      },
    });

    const destinationCarousel = (window as any).jQuery('.carousel-destination');
    destinationCarousel.owlCarousel({
      loop: true,
      items: 1,
      margin: 30,
      responsive: {
        0: { items: 1 },
        600: { items: 2 },
        1000: { items: 4 },
      },
    });
  }

  // Handle dropdown hover events
  handleDropdownHover() {
    const navDropdowns = this.document.querySelectorAll('nav .dropdown');
    navDropdowns.forEach((dropdown) => {
      dropdown.addEventListener('mouseenter', () => {
        this.renderer.addClass(dropdown, 'show');
        dropdown.querySelector('> a')?.setAttribute('aria-expanded', 'true');
        this.renderer.addClass(dropdown.querySelector('.dropdown-menu'), 'show');
      });

      dropdown.addEventListener('mouseleave', () => {
        this.renderer.removeClass(dropdown, 'show');
        dropdown.querySelector('> a')?.setAttribute('aria-expanded', 'false');
        this.renderer.removeClass(dropdown.querySelector('.dropdown-menu'), 'show');
      });
    });
  }

  // Handle scroll animations
  handleScrollAnimations() {
    const navbar = this.document.querySelector('.ftco_navbar');
    const scrollWrapper = this.document.querySelector('.js-scroll-wrap');

    fromEvent(window, 'scroll').subscribe(() => {
      const scrollTop = window.scrollY;
      if (scrollTop > 150) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled', 'sleep');
      }
      if (scrollTop > 350) {
        navbar?.classList.add('awake');
        scrollWrapper?.classList.add('sleep');
      } else {
        navbar?.classList.remove('awake');
        scrollWrapper?.classList.remove('sleep');
      }
    });
  }

  // Initialize counters
  initCounters() {
    const counters = this.document.querySelectorAll('.number');
    counters.forEach((counter) => {
      const targetNumber = parseInt(counter.getAttribute('data-number') || '0', 10);
      let currentNumber = 0;

      const interval = setInterval(() => {
        currentNumber += Math.ceil(targetNumber / 100); // Simple animation logic
        if (currentNumber >= targetNumber) {
          currentNumber = targetNumber;
          clearInterval(interval);
        }
        counter.textContent = currentNumber.toLocaleString(); // Update counter text
      }, 30);
    });
  }

  // Initialize animations on scroll
  initContentAnimations() {
    const items = this.document.querySelectorAll('.ftco-animate');

    const checkVisibility = () => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // Element is in view
          const effect = item.getAttribute('data-animate-effect') || 'fadeInUp';
          this.renderer.addClass(item, effect);
          this.renderer.addClass(item, 'ftco-animated');
        }
      });
    };

    // Call checkVisibility on scroll
    fromEvent(window, 'scroll')
      .pipe(debounceTime(100))
      .pipe(throttleTime(25)) // Only trigger once every 100ms
      .subscribe(checkVisibility);

    // Call it once on initialization to check if elements are already in view
    checkVisibility();
  }

  // Initialize magnific popup for images
  initMagnificPopup() {
    const magnificPopup = (window as any).jQuery('.image-popup');
    magnificPopup.magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1],
      },
      image: {
        verticalFit: true,
      },
      zoom: {
        enabled: true,
        duration: 300,
      },
    });
  }

  // Initialize datepicker for check-in and check-out dates
  initDatePickers() {
    const checkinDates = this.document.querySelectorAll('.checkin_date, .checkout_date');
    checkinDates.forEach((datepicker) => {
      // Initialize your datepicker here (assuming you have a jQuery datepicker)
      (window as any).jQuery(datepicker).datepicker({
        format: 'm/d/yyyy',
        autoclose: true,
      });
    });
  }
}