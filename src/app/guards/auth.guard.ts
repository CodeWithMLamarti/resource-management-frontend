import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";
import next from "ajv/dist/vocabularies/next";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUserLogin(route, state.url);
    /*
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']).then(r => console.log("hi"));
      return true;
    } else {
      this.router.navigate(['/login']).then(r => console.log("hi"));
      return false;
    }

     */
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn()) {
      let userRole = this.authService.getRole();
      userRole = userRole ? userRole : localStorage.getItem("role");
      console.log(userRole, url, route.data.role, route.data.role.includes(userRole), route);
      if (route.data.role && !route.data.role.includes(userRole)) {
        this.router.navigate(['/access-denied']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
  
}
