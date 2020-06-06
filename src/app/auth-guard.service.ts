import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate , CanActivateChild{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                return this.authService.isAuthendicated().then((authendicated: boolean) => {
                   if (authendicated) {
                     return true;
                   } else {
                    this.router.navigate(['/']);
                    // return false;
                   }
                 });
  }
  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route , state);
    }
}
