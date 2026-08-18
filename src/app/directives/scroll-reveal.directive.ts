import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealAnimation: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' = 'fade-up';
  @Input() revealDelay: number = 0; // Delay in ms

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'reveal-element');
    this.renderer.addClass(this.el.nativeElement, `reveal-${this.revealAnimation}`);

    if (this.revealDelay > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'transition-delay', `${this.revealDelay}ms`);
    }

    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'revealed');
            // Unobserve after revealing once
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
      });

      this.observer.observe(this.el.nativeElement);
    } else {
      // Fallback if IntersectionObserver is unsupported
      this.renderer.addClass(this.el.nativeElement, 'revealed');
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
