import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') public loginForm: NgForm | undefined;

  loginReq = {username:'',password:''};
  isLoginFailed = false;
 
  constructor(private _router: Router, private _authService: AuthService,
    public dialog: MatDialog, private tokenStorage: TokenStorageService){
  }

  ngOnInit(): void {
    if (this._authService.isLogin) {
      this._router.navigate(['']);
    }
  }


  login(){
    this._authService.getUser(this.loginReq.username).subscribe(
      data => {
        if(data.password == this.loginReq.password){
          this.isLoginFailed = false;
          this.loginSuccess(data);
        }else{
          this.isLoginFailed = true;
        }
      },
      err => {
        this.isLoginFailed = true;
      }
    );
  }

  private loginSuccess(data: any) {
    this.tokenStorage.saveUser(data);
    this._authService.isLogin = true;
    this.gotoLandingPage();
  }

  gotoLandingPage(){
    window.location.reload();
  }
}
