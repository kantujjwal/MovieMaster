import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/Models/movie.modal';
import { MovieService } from 'src/app/Services/movie.service';
import {Location} from '@angular/common';

@Component({
  selector: 'movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  currentImg = '';
  imgIdx = 0;
  movieId: string | undefined;
  movie: Movie | undefined;
  constructor(private route: ActivatedRoute,
    private movieService: MovieService,
    private _location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.movieService.getMovie(this.movieId).subscribe((data: any)=>
      {
        this.movie = data;
        this.currentImg = data.posterurl.length>0?data.posterurl[0]: '';

        if(data.posterurl.length>1){
          setInterval(()=>{
            this.imgIdx++;
            if(this.movie?.posterurl && this.imgIdx >= this.movie?.posterurl.length ){
              this.imgIdx = 0;
            }
            this.currentImg = this.movie?.posterurl[this.imgIdx]?this.movie?.posterurl[this.imgIdx]:'';
          },2000);
        }
      });
    });
  }

  getRating(r:number[]|undefined){
    return (r && r.length>0)?r.reduce((accumulator, curr) => accumulator + curr) / r.length : 0;
  }

  toInt(v:number){
    return Math.trunc(v);
  }

  gotoBack(){
    this._location.back();
  }

  setDefImg(e:any){
    console.log(e);
    if(this.movie){
    this.currentImg = "https://media.gettyimages.com/vectors/cinema-poster-with-cola-filmstrip-and-clapper-vector-vector-id1244034031?s=612x612";
      }
    }

    setCurrentImg(i: string){
      this.currentImg = i;
    }
}