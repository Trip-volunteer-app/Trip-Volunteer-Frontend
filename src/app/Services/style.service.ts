import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private renderer: Renderer2;

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  /**
   * Sets the height of elements with the 'js-fullheight' class
   * to match the window height and updates on window resize.
   */
  applyFullHeight() {
    const elements = this.document.querySelectorAll('.js-fullheight');
    
    const setHeight = () => {
      const windowHeight = window.innerHeight;
      elements.forEach((el) => {
        this.renderer.setStyle(el, 'height', `${windowHeight}px`);
      });
    };
  
    setHeight(); // Set initial height
  
    // Recalculate height on window resize
    fromEvent(window, 'resize')
      .pipe(debounceTime(100)) // Add debounce to prevent excessive recalculation
      .subscribe(setHeight);
  }

}
