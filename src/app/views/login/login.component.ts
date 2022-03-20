import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { CryptoService } from '@core/services/crypto.service';

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

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private _crypto: CryptoService
  ) {
    this.userData = {
      name: '',
      password: ''
    }
  }

  public onSubmit(): void {
    this.userData.password = this._crypto.encrypt(this.userData.password);

    this._auth.loginUser(this.userData)
      .subscribe(
        res => {
          this.loginValid = true;
          localStorage.setItem('token', res.token);
          this._router.navigate(['/apartments']);
        },
        err => {
          console.error('err: ', err);
          this.loginValid = false;
        }
      )
  }
}
