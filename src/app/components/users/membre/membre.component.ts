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
import {
  faUser,
  faPenToSquare,
  faCirclePlus,
  faSave,
  faArrowsRotate,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from '../../pages/modal/modal.component';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-membre',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ModalComponent,
  ],
  templateUrl: './membre.component.html',
  styleUrl: './membre.component.css',
  providers: [AppService, AuthService],
})
export class MembreComponent implements OnInit {

  faUser = faUser 

  isDisplayButton: boolean = false;
  isDisplayCard: boolean = false;

  // Methode permettant d'afficher les historiques

  onClickVoirHistorique() {
    this.appService.onClickVoirHistorique()
  }

  // Méthode permettant de switcher entre les boutons Edit et Save.
  editButton() {
    this.isDisplayButton = !this.isDisplayButton;
  }
  saveButton() {
    this.isDisplayButton = !this.isDisplayButton;
  }
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
    private appService: AppService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  //Récupération du nom de l'utilisateur connecté depuis le LocalStorage.
  userNom = this.authService.getNom();
  userRole = this.authService.getRole();

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
            { timeOut: 3000, positionClass: 'toast-bottom-right' }
          );
          this.loadProjects();
          this.selectedProject = null;
        },
        (error) => {
          console.error(error);
          this.toastr.error('Erreur lors de la mise à jour du projet.');
        }
      );
    }
    this.appService.logAction(
      `Le projet << ${this.selectedProject.nom} >> a été mise à jour`,
      `${this.userNom} `,
      `${this.userRole} `
    );
  }

  // Annuler la modification en désélectionnant le projet
  cancelEdit(): void {
    this.selectedProject = null;
    this.displayCard();
  }
}
