//Import des librairies et composants
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterOutlet , Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faCirclePlus, faTrashCan, faSave, faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../../pages/modal/modal.component';
import { AppService } from '../../../services/app.service';
import {AuthService} from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ModalComponent,
  ],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css',
  providers: [AppService, AuthService],
})
export class AddProjectComponent implements OnInit {
  isDisplayButton: boolean = false;
  isDisplayCard: boolean = false;

  // Méthode permettant de switcher entre les boutons Edit et Save.

  editingCard() {
    this.isDisplayCard = !this.isDisplayCard;
  }
  displayCard() {
    this.isDisplayCard = !this.isDisplayCard;
  }

  faPenToSquare = faPenToSquare;
  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faArrowsRotate = faArrowsRotate;
  faSave = faSave;
  projectList: any[] = [];
  selectedProject: any = null;

  constructor(
    private authService: AuthService,
    private appService: AppService, 
    private toastr: ToastrService,
    private router: Router
  ) {}

    userNom = this.authService.getNom();
    userRole = this.authService.getRole();


  ngOnInit(): void {
    this.loadProjects();
  }
  loadPage(): void{
    this.router.navigate([this.router.url]);
  }
  // Chargement de la liste des projets
  loadProjects(): void {
    this.appService.getProjects().subscribe(
      (project) => {
        this.projectList = project;
        this.toastr.success('Projets chargés avec succès !');
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
    this.editingCard();
  }

  // Mise à jour du  projet
  updateProject(): void {
    if (this.selectedProject) {
      const projectId = this.selectedProject.id;
      const patchData = { ...this.selectedProject }; 

      this.appService.patchProject(projectId, patchData).subscribe(
        (result) => {
          console.log(result);
          this.toastr.success(
            `Le projet ${this.selectedProject.nom} a été mis à jour.`,
            '',
            { timeOut: 3000, positionClass: 'toast-bottom-right', }
          );
          this.loadProjects(); 
          this.selectedProject = null;
        },
        (error) => {
          console.error(error);
          this.toastr.error('Erreur lors de la mise à jour du projet.',
            '',
            { timeOut: 3000, positionClass: 'toast-bottom-right', }
          );
        }
      );
    }
         // Création de l'evenement delete dans l'historique; 
        this.appService.logAction(`Le projet << "${this.selectedProject.nom}" >> a été mis à jour`,  `${this.userNom}`, `${this.userRole}`);

  }

    // Mise à jour du  projet
    deleteProject(): void {
      if (this.selectedProject) {
        const projectId = this.selectedProject.id;
        const projecName = this.selectedProject.nom;
  
        this.appService.deleteProject(projectId).subscribe(
          (result) => {
            console.log(result);
            this.toastr.success(
              `Le projet ${this.selectedProject.nom} a été supprimé.`,
              '',
              { timeOut: 3000, positionClass: 'toast-bottom-right', }
            );
            this.loadProjects(); 
            this.selectedProject = null;
          },
          (error) => {
            console.error(error);
            this.toastr.error('Erreur lors de la suppression.');
          }
        );
      }

      // Création de l'evenement delete dans l'historique; 
      this.appService.logAction(`Le projet << "${this.selectedProject.nom}" >> a été supprimé`, `${this.userRole}`, `${this.userNom}`);
      
    }


  // Annuler la modification en désélectionnant le projet
  cancelEdit(): void {
    this.selectedProject = null;
    this.displayCard();
  }

}

