import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';  // Ajoutez cette ligne

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],  // Ajoutez CommonModule
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
  // Retirez providers: [AuthService]
})
export class NavComponent {
  ImgLogo = 'assets/logo-vignette.png';
  constructor(private router: Router, private auth: AuthService) {}
  userRole: string | null = '';

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
  }

  onClickMonCompt() {
    if (this.userRole == 'Administrateur') {
      this.router.navigate(['/admin']);
    } else if (this.userRole == 'Membre') {
      this.router.navigate(['/membre']);
    } else if (this.userRole == 'Observateur') {
      this.router.navigate(['/observateur']);
    } else {
      console.error("Une erreur s'est produite");
    }
  }

  loggedOut() {
    this.auth.logOut();
  }
}