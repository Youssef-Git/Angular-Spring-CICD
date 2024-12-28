import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnexionComponent } from '../connexion/connexion.component';
import { InscriptionComponent } from '../inscription/inscription.component';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {



  constructor(private toastr: ToastrService, private router: Router) {}

  isSignUp: boolean = false;

  switchToLogin() {
    this.isSignUp = !this.isSignUp;
  }

  switchToSignIn() {
    this.isSignUp = !this.isSignUp;
  }

  //Méthodes de connexion
  logIn(): void {
    localStorage.setItem('token', 'loggedIn');
  }
  
  //Méthode pour vérifier q'un utilisateur est déconnecté.
  logOut(): void {
    localStorage.removeItem('token');
    this.toastr.success('Vous êtes déconnecté');
    this.router.navigate(['/login']);
  }
  getNom(){
    return localStorage.getItem('nom');
  }
  getRole(){
    return localStorage.getItem('role');
  }

}
