import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public title: string = "Meloger.com";
  public isAuthenticated: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public logout(): void {
    // TODO
  }

}

