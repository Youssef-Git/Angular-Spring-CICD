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
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../services/app.service';
import { AuthService } from '../auth/auth.service';
import {AuthComponent} from './../auth/auth.component'

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css',
  providers: [AppService, AuthService],
})


export class InscriptionComponent implements OnInit {
  psw: string = '';
  repsw: string = '';

  userForm!: FormGroup;

  constructor(

    private authService: AuthService,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  isSignUp: boolean = false;
  
  switchToLogin() {
    this.authService.switchToSignIn();
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      nom: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
    });
  }

  sInscrire() {

    if (this.userForm.valid) {
      const psw = this.userForm.get('password')?.value;
      const repsw = this.userForm.get('repassword')?.value;
      if (psw === repsw) {
        this.appService
          .postUsers(this.userForm.value)
          .subscribe((response) => { 
            this.toastr.success(
              'Inscrption réussie',
              'Vous serez redirigé vers la page de connexion',
              {
                timeOut: 5000, 
                positionClass: 'toast-top-center'
              }
            );
            this.switchToLogin();
          });
      } else {
        this.toastr.error('Les mots de passes saisis ne sont pas indentiques',
        );
      }
    }else{
      this.toastr.error('Veillez remplir tous les champs');
  }
}
}