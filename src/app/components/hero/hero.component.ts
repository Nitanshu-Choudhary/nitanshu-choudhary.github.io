import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  config = PORTFOLIO_CONFIG;
  
  scrollY = 0;
  cardRotateX = 0;
  cardRotateY = 0;

  constructor(private el: ElementRef) {}

  get socialLinks() {
    return [
      { icon: 'fa-brands fa-github', url: this.config.githubUrl, label: 'GitHub' },
      { icon: 'fa-brands fa-linkedin', url: this.config.linkedinUrl, label: 'LinkedIn' },
      { icon: 'fa-solid fa-envelope', url: 'mailto:' + this.config.email, label: 'Email' },
      { icon: 'fa-solid fa-phone', url: 'tel:' + this.config.phone, label: 'Phone' }
    ];
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window !== 'undefined') {
      this.scrollY = window.scrollY;
    }
  }

  // Interactive 3D Card Hover / Mouse Move Effect
  onCardMouseMove(event: MouseEvent) {
    const card = (event.currentTarget as HTMLElement);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    this.cardRotateX = ((y - centerY) / centerY) * -8;
    this.cardRotateY = ((x - centerX) / centerX) * 8;
  }

  onCardMouseLeave() {
    this.cardRotateX = 0;
    this.cardRotateY = 0;
  }

  onSocialClick(event: MouseEvent, url: string) {
    if (!url) return;
    if (url.startsWith('mailto:') || url.startsWith('tel:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}
