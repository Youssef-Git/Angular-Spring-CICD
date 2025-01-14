import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-observateur',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './observateur.component.html',
  styleUrl: './observateur.component.css',
  providers: [AppService, AuthService],
})
export class ObservateurComponent implements OnInit {
  faUser = faUser;
  projectList: any[] = [];

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private authService: AuthService
  ) {}

  onClickVoirHistorique() {
    this.appService.onClickVoirHistorique()
  }

  userNom = this.authService.getNom();
  userRole = this.authService.getRole();

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.appService.getProjects().subscribe(
      (result) => (this.projectList = result),
      (error) => console.error(error)
    );
  }
}