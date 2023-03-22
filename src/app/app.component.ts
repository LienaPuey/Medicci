import { UsersService } from 'src/app/services/users.service';
import { Component} from '@angular/core';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'medicci';
  user?: User |null;
  constructor(private usersService: UsersService ){
    this.usersService.isLogged.subscribe()
  }

}
