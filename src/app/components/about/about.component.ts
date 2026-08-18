import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  config = PORTFOLIO_CONFIG;

  capabilityOverview = [
    { title: '3+ Yrs Experience', icon: 'fa-solid fa-briefcase' },
    { title: 'Full Stack .NET & Angular', icon: 'fa-solid fa-layer-group' },
    { title: 'Azure & Microservices', icon: 'fa-solid fa-cloud' },
    { title: 'CRM & API Integrations', icon: 'fa-solid fa-plug' }
  ];

  highlights = [
    {
      title: 'Languages & Backend',
      desc: 'C#, ASP.NET Core, ASP.NET MVC, .NET, REST API Design, Dapper, Entity Framework Core',
      icon: 'fa-solid fa-server'
    },
    {
      title: 'Frontend Development',
      desc: 'Angular, TypeScript, JavaScript, HTML5, CSS3, Bootstrap, Responsive UI',
      icon: 'fa-solid fa-desktop'
    },
    {
      title: 'Cloud, DevOps & AI Workflow',
      desc: 'Azure Functions, Durable Functions, Blob Storage, App Insights, Docker, CI/CD, GitHub Copilot, Claude',
      icon: 'fa-solid fa-cloud-bolt'
    }
  ];
}
