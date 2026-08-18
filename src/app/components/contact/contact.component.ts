import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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

  isSubmitting = false;
  isSubmitted = false;
  errorMessage = '';

  constructor(private http: HttpClient) {}

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

  validateEmail(email: string): boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email.toLowerCase());
  }

  get isValid(): boolean {
    return (
      this.formData.name.trim().length >= 2 &&
      this.validateEmail(this.formData.email) &&
      this.formData.subject.trim().length >= 2 &&
      this.formData.message.trim().length >= 10
    );
  }

  onSubmit() {
    if (!this.isValid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const payload = {
      name: this.formData.name,
      email: this.formData.email,
      subject: this.formData.subject,
      message: this.formData.message,
      _replyto: this.formData.email
    };

    // Try sending email via Formspree AJAX API first
    this.http.post(this.config.formspreeEndpoint, payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.formData = { name: '', email: '', subject: '', message: '' };

        setTimeout(() => {
          this.isSubmitted = false;
        }, 6000);
      },
      error: () => {
        // Fallback: Open mail client if API endpoint fails
        this.isSubmitting = false;
        const mailtoSubject = encodeURIComponent(this.formData.subject || 'Portfolio Contact');
        const mailtoBody = encodeURIComponent(`Name: ${this.formData.name}\nEmail: ${this.formData.email}\n\nMessage:\n${this.formData.message}`);
        window.location.href = `mailto:${this.config.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
        
        this.isSubmitted = true;
        this.formData = { name: '', email: '', subject: '', message: '' };

        setTimeout(() => {
          this.isSubmitted = false;
        }, 6000);
      }
    });
  }
}
