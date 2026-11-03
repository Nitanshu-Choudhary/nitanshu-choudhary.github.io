import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  config = PORTFOLIO_CONFIG;
  isScrolled = false;
  isMobileMenuOpen = false;
  scrollProgress = 0;
  activeSection = 'hero';

  navLinks = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  ngOnInit() {
    this.updateScrollMetrics();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScrollMetrics();
  }

  private updateScrollMetrics() {
    if (typeof window === 'undefined') return;

    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 20;

    // Calculate Scroll Progress
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;

    // Determine Active Section on Scroll (Scroll Spy)
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
    const scrollPosition = scrollY + 150;

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const section = document.getElementById(sectionIds[i]);
      if (section && section.offsetTop <= scrollPosition) {
        this.activeSection = sectionIds[i];
        break;
      }
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
