import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import {ConnexionComponent} from "../connexion/connexion.component";
import {InscriptionComponent} from '../inscription/inscription.component';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ConnexionComponent, InscriptionComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent  {


  ImgHome="assets/home.png"
constructor(
  private authService: AuthService
){}
isSignUp: boolean = false;

}
