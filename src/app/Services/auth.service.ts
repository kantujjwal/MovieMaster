import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:3000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;

  constructor(private http: HttpClient, private token: TokenStorageService) { 
    this.checkLogin();
  }

  checkLogin(): boolean{
    this.isLogin = !!this.token.getUser();
    return this.isLogin;
  }

  
  getRoles(){
    const user = this.token.getUser();
    return user?user.roles:null;
  }

  getUser(id: string): Observable<any> {
    return this.http.get(AUTH_API + `Users/${id}`, httpOptions);
  }

  logOut() {
    this.token.signOut();
    this.isLogin = false;
  }
}