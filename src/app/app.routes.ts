import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component"
import { AuthComponent } from './components/auth/auth.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AdminComponent } from './components/users/admin/admin.component';
import { MembreComponent } from './components/users/membre/membre.component';
import { ObservateurComponent } from './components/users/observateur/observateur.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import {AuthguardService} from "./components/services/authguard.service";
import {AddUserComponent} from "./components/users/admin/add-user/add-user.component";
import {loginGuard} from "./components/guards/login.guard";

import {useRoleGuard} from "./components/guards/use-role.guard";
import {HistoriquesComponent} from  './components/pages/historiques/historiques.component';


export const routes: Routes = [

  {
    path: '' , 
    redirectTo: '/dashboard', 
    pathMatch: 'full',
  },
  {
    path: 'login' , 
    component:AuthComponent, 
    canActivate:[loginGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent, 
    canActivate: [AuthguardService]  
  },
  {
    path: 'admin',
    component: AdminComponent, 
    canActivate: [AuthguardService, useRoleGuard],
    data: { roles: ['Administrateur'] } 
  },
  {
    path: 'ajout/utilisateur',
    component: AddUserComponent,  
  },
  {
    path: 'membre',
    component: MembreComponent, 
    canActivate: [AuthguardService, useRoleGuard], 
    data: { roles: ['Membre'] }
  
  },
  {
    path: 'observateur',
    component: ObservateurComponent,  
    canActivate: [AuthguardService,useRoleGuard ], 
    data: { roles: ['Observateur'] }
  },
  {
    path: 'historiques',
    component: HistoriquesComponent,
    canActivate: [AuthguardService],
  },

  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthguardService] 
  },
];
