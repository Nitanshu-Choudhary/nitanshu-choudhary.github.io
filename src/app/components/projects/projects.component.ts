import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';
import { GithubService, GithubRepo } from '../../services/github.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  config = PORTFOLIO_CONFIG;
  repositories: GithubRepo[] = [];
  isLoading = true;

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.isLoading = true;
    this.githubService.getUserRepositories(this.config.githubUsername).subscribe({
      next: (repos) => {
        this.repositories = repos;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
