import { Component } from '@angular/core';
import { AuthService } from '@core/auth.service';

import { IUser } from '@core/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public hide: boolean = true;
  public loginValid = true;
  public userData: IUser;

  constructor(
    private _auth: AuthService
  ) {
    this.userData = {
      name: '',
      password: ''
    }
  }

  public onSubmit(): void {
    this.loginValid = true;

    this._auth.registerUser(this.userData)
      .subscribe(
        res => console.log('res: ', res),
        err => console.error('err: ', err)
      )
  }

}
