import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  isCopied = false;

  constructor(private http: HttpClient) {}

  get contactMethods() {
    return [
      {
        icon: 'fa-solid fa-envelope',
        title: 'Email',
        value: this.config.email,
        action: 'mailto:' + this.config.email,
        isEmail: true
      },
      {
        icon: 'fa-brands fa-linkedin',
        title: 'LinkedIn',
        value: 'Nitanshu Chaudhary',
        action: this.config.linkedinUrl,
        isEmail: false
      },
      {
        icon: 'fa-brands fa-github',
        title: 'GitHub Profile',
        value: this.config.githubUrl,
        action: this.config.githubUrl,
        isEmail: false
      },
      {
        icon: 'fa-solid fa-location-dot',
        title: 'Location',
        value: this.config.location,
        action: '#',
        isEmail: false
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

  copyEmail(event?: Event) {
    if (event) event.preventDefault();
    navigator.clipboard.writeText(this.config.email).then(() => {
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 3000);
    }).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = this.config.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 3000);
    });
  }

  onSubmit() {
    if (!this.isValid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const payload = {
      name: this.formData.name,
      email: this.formData.email,
      _replyto: this.formData.email,
      subject: this.formData.subject,
      message: this.formData.message,
      _subject: `New Portfolio Message from ${this.formData.name}: ${this.formData.subject}`,
      _template: 'table',
      _captcha: 'false'
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // Send email directly through open third-party API (FormSubmit.co)
    const endpoint = this.config.formEndpoint || `https://formsubmit.co/ajax/${this.config.email}`;

    this.http.post<any>(endpoint, payload, { headers }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.formData = { name: '', email: '', subject: '', message: '' };

        setTimeout(() => {
          this.isSubmitted = false;
        }, 7000);
      },
      error: (err) => {
        // Pure in-app feedback without launching Outlook or external mail apps
        this.isSubmitting = false;
        this.errorMessage = 'Notice: If this is the first submission, FormSubmit sends an activation link to the inbox. You can also copy Nitanshu\'s email with one click below.';
      }
    });
  }
}
