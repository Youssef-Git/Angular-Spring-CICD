import { CanActivateFn ,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {inject} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)   
  const toastr = inject (ToastrService)

  const isLoggedIn = !!localStorage.getItem('token')

  if (isLoggedIn){
    toastr.success("Vous avez déja une session ouverte", "Cette page n'est pas disponible")
    router.navigate(['/dashboard']);
    return false;
  }
      return true;
  
};
