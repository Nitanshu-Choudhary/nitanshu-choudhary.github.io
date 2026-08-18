import { Component } from '@angular/core';
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
  
  get socialLinks() {
    return [
      { icon: 'fa-brands fa-github', url: this.config.githubUrl, label: 'GitHub' },
      { icon: 'fa-brands fa-linkedin', url: this.config.linkedinUrl, label: 'LinkedIn' },
      { icon: 'fa-solid fa-envelope', url: 'mailto:' + this.config.email, label: 'Email' },
      { icon: 'fa-solid fa-phone', url: 'tel:' + this.config.phone, label: 'Phone' }
    ];
  }

  onSocialClick(event: MouseEvent, url: string) {
    debugger
    if (!url) return;
    if (url.startsWith('mailto:') || url.startsWith('tel:')) {
      // Standard location assignment for mailto and tel protocols
      window.location.href = url;
    } else {
      // Open web URLs in new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}
