import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Nitanshu Chaudhary - Portfolio';
  showScrollTop = false;
  scrollProgress = 0;
  readonly circumference = 2 * Math.PI * 18; // ~113.097

  ngOnInit() {
    this.updateScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScroll();
  }

  private updateScroll() {
    if (typeof window === 'undefined') return;
    const scrollY = window.scrollY;
    this.showScrollTop = scrollY > 280;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
  }

  get strokeDashoffset(): number {
    return this.circumference - (this.scrollProgress / 100) * this.circumference;
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
