//Import des librairies et composants
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppService } from '../../services/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [AppService],
})
export class DashboardComponent implements OnInit {
  
  homePage: string = 'assets/home1.jpg';

  projectList: any[] = [];
  selectedProject: any = null;
  isDisplayButton: boolean = false;

  // Méthode permettant de switcher entre les boutons Edit et Save.
  cancelButton() {
    this.isDisplayButton = !this.isDisplayButton;
  }

  constructor(
    private http: HttpClient,
    private appService: AppService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  // Chargement de la liste des projets
  loadProjects(): void {
    this.appService.getProjects().subscribe(
      (project) => {
        this.projectList = project;
        // this.toastr.success('Projets chargés avec succès !');
      },
      (error) => {
        console.error(error);
        this.toastr.error('Impossible de charger les projets.');
      }
    );
  }

  // Sélectionner un projet pour modification
  selectProject(project: any): void {
    this.selectedProject = { ...project };
  }

  
}
