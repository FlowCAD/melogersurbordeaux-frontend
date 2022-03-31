import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth.service';
import { CryptoService } from '@core/services/crypto.service';

import { IUser } from '@core/interfaces';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public hide: boolean = true;
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

    this._auth.registerUser(this.userData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userName', this.userData.name);
          this._router.navigate(['/list']);
        },
        err => console.error('err: ', err)
      )
  }

}
