import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLE } from '../services/constant/role.constant';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(
       private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const login = JSON.parse(localStorage.getItem('curentUser') as string)
    if (login && (login.role === ROLE.ADMIN || login.role === ROLE.USER)){
     return true;
       }
    this.router.navigate(['']);
    return false
  }
  
}
