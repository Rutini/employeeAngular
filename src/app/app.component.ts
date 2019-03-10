import {Component, OnInit} from '@angular/core';
import {Response} from './models/Response';
import {UserService} from './services/user.service';
import {User} from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService
  ) {
  }

  isLogged;
  isRegistered;
  newUser: User;
  userData;
  correctPassword;
  emailAlreadyExist;

  ngOnInit() {
    this.isLogged = !!localStorage.getItem('token');
    this.saveLoggedUser();
    this.correctPassword = true;
    this.emailAlreadyExist = false;
    this.isRegistered = false;
  }


  sendLoginUserData(email, password) {
    this.userData = {
      email,
      password
    };

    this.userService.loginUser(this.userData)
      .subscribe((response: Response) => {
        if (!response.success && response.message === 'Wrong password') {
          this.correctPassword = false;
        } else if (response.success) {
          localStorage.setItem('token', response.message);
          this.userService.getUser()
            .subscribe((res: Response) => {
              if (res.success) {
                this.userService.loggedUser.next(res.message);
                this.isLogged = true;
              }
            });
        }
      });
  }

  sendNewUserData(name, email, password) {
    this.newUser = {
      name,
      email,
      password
    };
    this.userService.registerUser(this.newUser)
      .subscribe((response: Response) => {
        if (!response.success && response.message === 'This user already exist') {
          this.emailAlreadyExist = true;
        } else if (response.success) {
          this.isRegistered = true;
        }
      });
  }

  saveLoggedUser(): void {
    if (this.isLogged) {
      this.userService.getUser()
        .subscribe((res: Response) => {
          if (res.success) {
            this.userService.loggedUser.next(res.message);
            this.isLogged = true;
          }
        });
    } else {
      this.isLogged = false;
    }
  }

  sighOut(): void {
    localStorage.removeItem('token');
    this.userService.loggedUser.next({});
    this.isLogged = false;
  }

}
