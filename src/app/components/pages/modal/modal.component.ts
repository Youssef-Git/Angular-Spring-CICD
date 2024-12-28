import { Component, NgModule, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppService } from '../../services/app.service';
import {AuthService} from '../../auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [AppService, AuthService],
})
export class ModalComponent implements OnInit {
  faCirclePlus = faCirclePlus;
  isModalOpen = false;
  projectForm!: FormGroup;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private appService: AppService,
    private toastr: ToastrService
  ) {}

  userNom = this.authService.getNom();
  userRole = this.authService.getRole();

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      nom: ['', Validators.required],
      objectif: ['', Validators.required],
      context: ['', Validators.required],
      description: ['', Validators.required],
      statut: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.appService.postProject(this.projectForm.value).subscribe(
        (response) => {
          // Envoie de l'historique d'ajout dans la bd;
          this.appService.logAction(`L'utilisateur << ${response.nom} >> a été mis à jour`, `${this.userNom} `, `${this.userRole}`);
          // console.log(response);
          this.toastr.success('Projet ajouté avec succès');
          this.projectForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.closeModal();
  }
}
