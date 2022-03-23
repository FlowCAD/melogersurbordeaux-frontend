
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _crypto: CryptoService,
    private _snackBar: MatSnackBar
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
          localStorage.setItem('userName', this.userData.name);
          this._router.navigate(['/apartments']);
        },
        err => {
          this.userData.password = '';
          this.loginValid = false;
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._snackBar.open('Identifiant et/ou Mot de passe invalides.', 'OK')
            }
          }
        }
      )
  }
}
