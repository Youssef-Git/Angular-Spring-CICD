import { CanActivateFn ,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {inject} from '@angular/core';
import { ToastrService } from 'ngx-toastr';



export const useRoleGuard: CanActivateFn = (route, state) => {
  
 
  const router = inject(Router)   
  const toastr = inject (ToastrService)
  const userRole = localStorage.getItem('role')
  const roleAutorise = route.data?.['roles'] as string[];

    if(userRole && roleAutorise &&roleAutorise.includes(userRole)){
      toastr.info(`Vous êtes connecté en tant que ${userRole}`)
      
    
      return true;
    }
    toastr.error("Vous n'avez pas les droits d'accès à cette page ")
    router.navigate(['/dashboard'])
  return false;
};
