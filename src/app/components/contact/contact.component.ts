import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  config = PORTFOLIO_CONFIG;

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitted = false;

  get contactMethods() {
    return [
      {
        icon: 'fa-solid fa-envelope',
        title: 'Email',
        value: this.config.email,
        action: 'mailto:' + this.config.email
      },
      {
        icon: 'fa-brands fa-linkedin',
        title: 'LinkedIn',
        value: 'Nitanshu Chaudhary',
        action: this.config.linkedinUrl
      },
      {
        icon: 'fa-brands fa-github',
        title: 'GitHub Profile',
        value: this.config.githubUrl,
        action: this.config.githubUrl
      },
      {
        icon: 'fa-solid fa-location-dot',
        title: 'Location',
        value: this.config.location,
        action: '#'
      }
    ];
  }

  onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }

    const mailtoSubject = encodeURIComponent(this.formData.subject || 'Portfolio Contact');
    const mailtoBody = encodeURIComponent(`Name: ${this.formData.name}\nEmail: ${this.formData.email}\n\nMessage:\n${this.formData.message}`);
    
    // Open default mail client fallback
    window.location.href = `mailto:${this.config.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    
    this.isSubmitted = true;
    setTimeout(() => {
      this.isSubmitted = false;
      this.formData = { name: '', email: '', subject: '', message: '' };
    }, 4000);
  }
}
