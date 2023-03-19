import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Form, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    // const userData = {
    //   email: 'lienapuey@gmail.com',
    //   password: 'liena123'
    // }
    // this.usersService.login(userData).subscribe(res => console.log('Login'));
  }
  loginForm = this.fb.group({
    email: [''],
    password: ['']
  })
  constructor(private usersService : UsersService, private fb: FormBuilder, private router: Router, private cdr: ChangeDetectorRef){

  }
  onLogin(): void {
    const formValue = this.loginForm.value;
    const email = formValue.email as string;
    const password = formValue.password as string;
    const userData: User = { email, password };
  
    this.usersService.login(userData).subscribe({
      next: () => {
        console.log('logeado');
        this.router.navigate(['/home']);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
