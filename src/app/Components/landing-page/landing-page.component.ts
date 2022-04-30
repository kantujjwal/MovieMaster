import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  menuNav:any[] = [];
  
  adminNav = [{name:"Latest Movies", link:'latest-movies'}, {name:"Contact Us", link:'contactus'},
  {name:"Movie List", link:'movie-list'}, {name:"Add Movie", link:'new-movie'}, {name:"Intrest Calcultor", link:'intrest-calc'}]

  userNasv = [{name:"Latest Movies", link:'latest-movies'}, {name:"Contact Us", link:'contactus'},
  {name:"Movie List", link:'movie-list'}]

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public cart: CartService, private _router: Router,
    public auth: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    if(!this.auth.checkLogin()){
      this._router.navigate(['login']);
    }else{
      this.menuNav = this.auth.getRoles().includes("ADMIN")? this.adminNav: this.userNasv;
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  clearOldFilterData(){
    localStorage.removeItem('filterData');
  }

  goToCart(){
    this._router.navigate(['/movie-cart']);
  }

  logout(){
    this.auth.logOut();
    this._router.navigate(['/login']);
  }
}
