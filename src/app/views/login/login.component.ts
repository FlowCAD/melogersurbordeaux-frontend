import { Component } from '@angular/core';

import { IUser } from '@core/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public hide: boolean = true;
  public loginValid = true;
  public userData: IUser;

  constructor( ) {
    this.userData = {
      name: '',
      password: ''
    }
  }

  public onSubmit(): void {
    this.loginValid = true;

    console.log('info:', this.userData);
  }
}
