import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { Movie } from 'src/app/Models/movie.modal';
import { MovieService } from 'src/app/Services/movie.service';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input('Movie') Movie: Movie | undefined;
  @Output() MovieDeleted = new EventEmitter<string>();
  currentImg = '';
  movieLogo = '';
  imgIdx = 0;
  refreshIntervalId: any;
  opacity = 1;
  isAdmin = false;
  constructor(private _router: Router,
    private movieService: MovieService,
    private cart: CartService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.currentImg = this.Movie?.posterurl[this.imgIdx]?this.Movie?.posterurl[this.imgIdx]:'';
    this.movieLogo = this.Movie?.posterurl[0]?this.Movie?.posterurl[0]:'';
    this.isAdmin = this.auth.getRoles()?.includes("ADMIN")?true:false;
  }

  gotoMovieDetails(id: string){
    this._router.navigate(['/movie-details',id]);
  }

  gotoMovieEdit(id: string){
    this._router.navigate(['/movie-edit',id]);
  }

  deleteMovie(id: string){
    this.movieService.deleteMovie(id).subscribe(res=>
      {
        this.MovieDeleted.emit(id);
      }
      );
  }

  setDefImg(){
    this.currentImg = "https://media.gettyimages.com/vectors/cinema-poster-with-cola-filmstrip-and-clapper-vector-vector-id1244034031?s=612x612";
  }

  setDefLogo(){
    this.movieLogo = "https://media.gettyimages.com/vectors/cinema-poster-with-cola-filmstrip-and-clapper-vector-vector-id1244034031?s=612x612";
  }

  scrollImgStart(){
    if(this.Movie && this.Movie.posterurl.length>1){
      this.refreshIntervalId = setInterval(()=>{
        this.imgIdx++;
        if(this.Movie?.posterurl && this.imgIdx >= this.Movie?.posterurl.length ){
          this.imgIdx = 0;
        }
        this.opacity = 0;
        this.currentImg = this.Movie?.posterurl[this.imgIdx]?this.Movie?.posterurl[this.imgIdx]:'';
        setTimeout(()=>
            this.opacity = 1
            ,300)
      },2000);
    }
  }

  scrollImgStop(){
    if(this.refreshIntervalId){
      console.log('clear');
    clearInterval(this.refreshIntervalId);
    this.currentImg = this.Movie?.posterurl[this.imgIdx]?this.Movie?.posterurl[this.imgIdx]:'';
    }
  }

  addToCart(item: Movie){
    this.cart.add({id:item.id, title: item.title, days:1, posterurl: item.posterurl, stock: item.stock, rate: item.rate});
  }

  isInCart(id: string){
    return this.cart.cartItems.findIndex(x=>x.id === id) >= 0;
  }
}
