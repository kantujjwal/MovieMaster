import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/Models/movie.modal';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input('Movie') Movie: Movie | undefined;
  @Output() MovieDeleted = new EventEmitter<string>();
  constructor(private _router: Router,
    private movieService: MovieService) { }

  ngOnInit(): void {
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

  setDefImg(movie: Movie){
    movie.posterurl = ["https://media.gettyimages.com/vectors/cinema-poster-with-cola-filmstrip-and-clapper-vector-vector-id1244034031?s=612x612"];
  }


}
