import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    location: ['', Validators.required],
    category: ['', Validators.required]
  })
  constructor(private usersService: UsersService, private fb: FormBuilder, private router: Router ){}

  // onRegister(): void {
  //   const formValue = this.registerForm.value;
  //   const user: RegisterUser = {
  //     username: formValue.username as string,
  //     email: formValue.email as string,
  //     password: formValue.password as string,
  //     location: formValue.location as string,
  //     category: formValue.category as string
  //   };
  //   this.usersService.register(user).subscribe(res => {
  //     if (res) {
  //       this.router.navigate(['/login']);
  //     }
  //   });
  // }
}
