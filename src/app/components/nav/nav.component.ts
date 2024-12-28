import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  providers: [AuthService],
})
export class NavComponent {
  ImgLogo = 'assets/logo-vignette.png';

  constructor(private router: Router, private auth: AuthService) {}

  userRole: string | null = '';
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');
  }


   // Methode de rédirection des utilisateurs vers leurs routes spécifiques serlon leurs rôle.
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

  // Methode de déconnection
  loggedOut() {
    this.auth.logOut();
  }
}
