import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { PORTFOLIO_CONFIG } from '../config/portfolio.config';

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  language: string;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getUserRepositories(username: string = PORTFOLIO_CONFIG.githubUsername): Observable<GithubRepo[]> {
    if (!username || username.includes('[ADD MY')) {
      return of([]);
    }

    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=15`;

    return this.http.get<any[]>(apiUrl).pipe(
      map((repos) => {
        return repos
          .filter((repo) => {
            const name = (repo.name || '').toLowerCase();
            const isFork = !!repo.fork;
            // Exclude portfolio website repositories and forks to keep focus on technical software projects
            const isPortfolioRepo = 
              name.endsWith('.github.io') || 
              name.includes('github.io') || 
              name === 'portfolio' || 
              name.includes('portfolio-app');

            return !isFork && !isPortfolioRepo;
          })
          .map((repo) => ({
            id: repo.id,
            name: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
            description: repo.description || 'Public repository on GitHub showcasing practical full-stack implementation.',
            htmlUrl: repo.html_url,
            language: repo.language || 'Code',
            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            topics: repo.topics || [],
            updatedAt: repo.updated_at
          }));
      }),
      catchError((error) => {
        console.warn('Could not fetch GitHub repositories:', error);
        return of([]);
      })
    );
  }
}
