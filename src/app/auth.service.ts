import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;

  constructor() { }

  login() {
    this.loggedIn =  true;
  }
  logout() {
    this.loggedIn = false;
  }

  isAuthendicated() {
    const promise =  new Promise((resolve, rejects) => {
     setTimeout(() => {
          resolve(this.loggedIn);
     }, 800);
    });
    return promise;
  }
}
