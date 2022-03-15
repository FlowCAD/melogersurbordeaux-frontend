import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public hide: boolean = true;
  public loginValid = true;
  public userData: {
    name: string;
    password: string;
  };

  constructor() {
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
