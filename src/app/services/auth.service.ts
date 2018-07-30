import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getToken(): string {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser !== null) {
      return currentUser.jeton;
    }
  }
}