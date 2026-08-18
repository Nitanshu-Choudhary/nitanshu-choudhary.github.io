import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

interface SkillCategory {
  category: string;
  icon: string;
  skills: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  config = PORTFOLIO_CONFIG;

  skillCategories: SkillCategory[] = [
    {
      category: 'Languages & Backend',
      icon: 'fa-solid fa-server',
      skills: this.config.skills.backend
    },
    {
      category: 'Frontend Development',
      icon: 'fa-solid fa-desktop',
      skills: this.config.skills.frontend
    },
    {
      category: 'Architecture & Engineering',
      icon: 'fa-solid fa-sitemap',
      skills: this.config.skills.architecture
    },
    {
      category: 'Database & Data',
      icon: 'fa-solid fa-database',
      skills: this.config.skills.database
    },
    {
      category: 'Cloud & DevOps',
      icon: 'fa-solid fa-cloud',
      skills: this.config.skills.cloudDevOps
    },
    {
      category: 'Third-Party Integrations',
      icon: 'fa-solid fa-plug',
      skills: this.config.skills.integrations
    },
    {
      category: 'AI-Assisted Engineering',
      icon: 'fa-solid fa-robot',
      skills: this.config.skills.aiAssisted
    }
  ];
}
