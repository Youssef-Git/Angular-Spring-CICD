import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthComponent } from '../auth/auth.component';
import { AppService } from '../services/app.service';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

interface usersDataList {
  id: number;
  nom: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
  providers: [AppService, AuthService],
})
export class ConnexionComponent implements OnInit {
  //Méthode pour vérifier q'un utilisateur est connecté.

  email: string = '';
  psw: string = '';

  usersList: usersDataList[] = [];
  loginForm!: FormGroup;

  isAdmin: boolean = false;


  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  // Bouton permettant de d'afficher le formulaire d'inscription.
  isSignUp: boolean = false;
  
  switchToSignIn() {
    this.authService.switchToSignIn();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      psw: ['', Validators.required],
    });
  }

  seConnecter() {
    if (this.loginForm.value) {
      const psw = this.loginForm.get('psw')?.value;
      const email = this.loginForm.get('email')?.value;

      this.appService.getUsers().subscribe((response: usersDataList[]) => {
        this.usersList = response;

        const user = this.usersList.find(
          (userInfo) => userInfo.email === email
        );

        if (user) {
          if (user.password === psw) {
            this.authService.logIn();
            // Récupération du nom et du rôle de l'utilisateur dans le Localstroage
            localStorage.setItem('nom', user.nom);
            localStorage.setItem('role', user.role);
            
            if (user.role == 'Administrateur') {
              this.router.navigate(['/dashboard']);
              this.toastr.info(`Vous ête connecté en tant que  ${user.nom}`);
            } 
            else if (user.role == 'Membre') {
              this.router.navigate(['/dashboard']);
              this.toastr.info(`Vous ête connecté en tant que  ${user.nom}`);
            }
            else if (user.role == 'Observateur') {
              this.router.navigate(['/dashboard']);
              this.toastr.info(`Vous ête connecté en tant que  ${user.nom}`);
            }
          } else {
            this.toastr.error('Mot de passe incorrect !');
          }
        } else {
          this.toastr.warning(' Email non trouvé ou erroné !');
        }
      });
    }
  }
}
