import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser, User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable, catchError, map, pipe, throwError } from 'rxjs';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private loggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient, private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) { 
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
  
        // Verificar si hay un token de usuario en el localstorage
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
          this.loggedIn.next(true);
        }
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  userData:any;
  get isLogged():Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  public get loginValue(){
    return this.loggedIn.value;
  }

 login(authData: User){
  this.loggedIn.next(true);
  return this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
  .then((userCredential:any) => {
    // Obtener el token de autenticación
    return userCredential.user.getIdToken();
  })
  .then((idToken) => {
    // Guardar el token en el localstorage
    localStorage.setItem('userToken', idToken);
    // Establecer la variable loggedIn en true
    this.loggedIn.next(true);
  })
  .catch((error) => {
    // Manejar el error
    console.error(error);
    throw error;
  });;
 }

  register(authData: User){
    return this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password);
  }
  get isAuthenticated(): boolean {
    const userToken = localStorage.getItem('userToken');
    return !!userToken;
  }
  get userToken(): string | null {
    return localStorage.getItem('userToken');
  }
  setUserData(user:any){
    const userRef: AngularFirestoreDocument<any>= this.afs.doc(
      `users/${user.uid}`
    );
    const userData: RegisterUser = {
      uid: user.uid,
      email: user.email,
      username: user.username,
      location: user.location,
      category: user.category,
      password: user.password
    }
    return userRef.set(userData, {
      merge: true,
    });
  }

  logout():void{
    localStorage.removeItem('userToken');
    this.loggedIn.next(false);
    this.router.navigate(['/home']);
  }

}
