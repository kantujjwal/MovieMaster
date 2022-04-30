import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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
  isLoginVisible = true;
  roles: string[] = [];
 
  constructor(private route: ActivatedRoute, private _router: Router, private _authService: AuthService,
    private _snackBar: MatSnackBar, public dialog: MatDialog,
    private tokenStorage: TokenStorageService){
  }

  ngOnInit(): void {
    if (this._authService.isLogin) {
      this.roles = this.tokenStorage.getUser().roles;
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
    this.roles = this.tokenStorage.getUser().roles;
    this._authService.isLogin = true;
    this.gotoLandingPage();
  }

  gotoLandingPage(){
    window.location.reload();
  }
  gotoLogin(){
    this.loginForm?.resetForm();
    this.isLoginVisible = true;
  }
}
