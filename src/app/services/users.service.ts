import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser, User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable, catchError, map, pipe, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private loggedIn = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }
  private readonly loginUrl = 'http://localhost:3000/login';
  private readonly registerUrl = 'http://localhost:3000/register';
 
  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  login(authData: User): Observable<any>{
    const data = authData;
    console.log({data});
    return this.http
    .post<{ token: string }>(this.loginUrl, data)
    .pipe(
      map( (res:any)=>{
        console.log('res', res);
        this.loggedIn.next(true);
      }),
      catchError((err) => this.handlerError(err))
    )
  }
  logout():void{
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/home']);
  }

  handlerError(err: any): Observable<never> {
    let errorMessage = 'An error occurred retrieving data';
    if(err){
      errorMessage = `Error: code ${err.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  register(user: RegisterUser): Observable<any> {
    return this.http.post<any>(this.registerUrl, user)
      .pipe(
        catchError(this.handlerError)
      );
  }
}
