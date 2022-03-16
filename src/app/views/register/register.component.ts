import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

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
    private _router: Router,
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
        res => {
          console.log('res: ', res);
          localStorage.setItem('token', res.token);
          this._router.navigate(['/apartments']);
        },
        err => console.error('err: ', err)
      )
  }

}
