import { CanActivateFn } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { inject, Inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const api=inject(ApiService)
  const toaster=inject(ToastrService)
  const router=inject(Router)

  if(api.checkLogin()){
    return true
  }else{
    toaster.warning("Please Login First")
    router.navigateByUrl('/log')
    return false;
  }

 
};
