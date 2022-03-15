import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public hide: boolean = true;
  public loginValid = true;
  public userData: {
    name: string;
    password: string;
  };

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
