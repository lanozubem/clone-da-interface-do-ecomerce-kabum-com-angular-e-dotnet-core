import { Component, OnInit, Output, EventEmitter, Input, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user';
import { LoginService } from '../Services/login.service';
import { SessionStorageService } from '../Services/session-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() openSidenav = new EventEmitter<boolean>();

  isAuthenticated = false;
  userLogged!: User;
  refresh = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private sessionStorage: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.userLogged = JSON.parse(this.sessionStorage.get("userLogged"));
    if (this.sessionStorage.get("isAuth") == "true") {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

  // Este método através do EventEmitter emitirá um evento contendo o valor booleano
  // true para o componente app-sidenav que conseguintemente abrirá a aba do sidenav 
  sidenavOpened() {
    this.openSidenav.emit(true);
  }

  loggout() {
    this.loginService.loggout();
  }

  refreshC() {
    if (this.refresh) {
      this.ngOnInit();
    }
  }
}
