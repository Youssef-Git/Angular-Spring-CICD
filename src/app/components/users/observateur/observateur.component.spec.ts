import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-observateur',
  templateUrl: './observateur.component.html',
  styleUrls: ['./observateur.component.css']
})
export class ObservateurComponent implements OnInit {
  userNom: string | null = null;
  userRole: string | null = null;
  projectList: any[] = [];

  constructor(
    private appService: AppService,
    private authService: AuthService
  ) {
    // Initialiser userNom et userRole dans le constructeur
    this.userNom = this.authService.getNom();
    this.userRole = this.authService.getRole();
  }

  ngOnInit(): void {
    this.getProjects();
  }

  onClickVoirHistorique(): void {
    // Appeler la méthode du service
    this.appService.onClickVoirHistorique();
  }

  getProjects(): void {
    this.appService.getProjects().subscribe({
      next: (projects) => {
        this.projectList = projects;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
