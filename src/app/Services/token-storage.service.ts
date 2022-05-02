import { Injectable } from '@angular/core';
import { User } from '../Models/user.model';
const USER_KEY = 'AUTH_USER';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  signOut(): void {
    localStorage.removeItem(USER_KEY);
  }

  public saveUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  
  public getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }
}