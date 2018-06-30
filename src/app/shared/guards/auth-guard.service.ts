import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) { }
  /**
   * activate the route
   * @param  {route,state}
   * @return {boolean}
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (sessionStorage.getItem('userInfo')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  /**
   * will check the child can be activated or not
   * @param  {void}
   * @return {boolean}
   */
  canActivateChild() {
    return true;
  }
}
