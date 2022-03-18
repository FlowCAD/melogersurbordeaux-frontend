import { Component, OnInit } from '@angular/core';

import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public title: string = "Meloger.com";

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.auth.logoutUser();
  }

}

