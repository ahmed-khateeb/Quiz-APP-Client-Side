import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log(this.userService.getUserPayload())
    if (!this.userService.isLoggedIn()) {
      this.userService.deleteToken();
      this.router.navigateByUrl('/user');
      return false;
    }
    return true;
  }
}
