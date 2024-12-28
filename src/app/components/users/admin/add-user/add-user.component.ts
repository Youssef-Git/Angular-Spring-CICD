//Import des librairies et composants
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPenToSquare,
  faCirclePlus,
  faTrashCan,
  faArrowsRotate,
} from '@fortawesome/free-solid-svg-icons';
import { AdduserformComponent } from '../../../formulaires/adduserform/adduserform.component';
import { AppService } from '../../../services/app.service';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AdduserformComponent,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
  providers: [AppService, AuthService],
})
export class AddUserComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faCirclePlus = faCirclePlus;
  faTrashCan = faTrashCan;
  faArrowsRotate = faArrowsRotate;

  isButton: boolean = false;

  userList: any[] = [];
  selectedUser: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private appService: AppService,
    private toastr: ToastrService
  ) {}

  userNom = this.authService.getNom();
  userRole = this.authService.getRole();

  //Toutes les méthodes se trouves ici
  ngOnInit(): void {
    this.loadUsers();
  }

  isDisplayButton() {
    this.isButton = !this.isButton;
  }
  isDisappearedButton() {
    this.isButton = !this.isButton;
  }
  cancelButton() {
    this.isButton = false;
  }
  loadUsers(): void {
    this.appService.getUsers().subscribe(
      (users) => (this.userList = users),
      (error) => console.error(error)
    );
  }

  selectUser(user: any): void {
    this.selectedUser = { ...user };
  }

  // Méthode de mise à jour d'utilisateur.
  updateUser(): void {
    if (this.selectedUser) {
      const userId = this.selectedUser.id;
      const userData = { ...this.selectedUser };
      this.appService.patchUsers(userId, userData).subscribe(
        (user) => {
          console.log(user);
          this.toastr.success(
            `L'utilisateur ${this.selectedUser.nom} modifié avec succès`,
            'Modification utilisateur',
            { timeOut: 3000, positionClass: 'toast-bottom-right' }
          );
        },
        (error) => {
          console.error(error);
          this.toastr.error(
            `L'utilisateur erreur lore de la modification de l'utilisateur!!!`,
            '',
            { timeOut: 3000, positionClass: 'toast-bottom-right' }
          );
        }
      );
    }
    this.appService.logAction(
      `L'utilisateur 
      << ${this.selectedUser.nom} >> a été mis à jour`,
      `${this.userNom} `,
      `${this.userRole}`
      
    );
  }

  deleteUsers(): void {
    if (this.selectedUser) {
      const userId = this.selectedUser.id;
      this.appService.deleteUsers(userId).subscribe(
        (user) => {
          console.log(user);
          this.toastr.success(
            `L'utilisateur ${this.selectedUser.nom} à été supprimé`,
            'Suppression utilisateur',
            { timeOut: 3000, positionClass: 'toast-bottom-right' }
          );
        },
        (error) => {
          console.error(error);
          this.toastr.error(
            ` Erreur lors de la suppression de l'utilisateur !!!`,
            '',
            { timeOut: 3000, positionClass: 'toast-bottom-right' }
          );
        }
      );
      this.appService.logAction(
        `L'utilisateur << ${this.selectedUser.nom} >> a été supprimé`,
        `${this.userNom} `,
        `${this.userRole}`
      );
    }
    // this.cancelButton(),
    this.loadUsers();
  }
}
