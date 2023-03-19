import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private usersService:UsersService, private router: Router){}
  canActivate(): Observable<boolean>{
    return this.usersService.isLogged.pipe(
      take(1),
      map((isLogged: boolean)=> {
        if (isLogged) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
