import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser  } from '@fortawesome/free-solid-svg-icons';
import { AddProjectComponent } from './add-project/add-project.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AppService } from '../../services/app.service';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AddProjectComponent,
    AddUserComponent,
    AddUserComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers: [AuthService, AppService],
})
export class AdminComponent implements OnInit {
  faUser = faUser 
  isAddProjectOpen: boolean = false;
//Récupération du nom de l'utilisateur connecté depuis le LocalStorage.
  userNom = this.authService.getNom();

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private appService: AppService
  ) {}

  ngOnInit() {
    
  }

  isButton: boolean = false;

  ajoutUserBtn() {
    this.isButton = !this.isButton;
  }

  ajoutProjetBtn() {
    this.isButton = !this.isButton;
  }

  onClickAddProject() {
    this.isAddProjectOpen = !this.isAddProjectOpen;
    this.ajoutUserBtn();
  }
  onClickVoirHistorique() {
    this.appService.onClickVoirHistorique()
  }
}
