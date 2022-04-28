import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/Models/movie.modal';
import { MovieService } from 'src/app/Services/movie.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {
  movieId: string | undefined;
  movie: Movie | undefined;

  genreList = ['Crime', 'Drama', 'Musical', 'Action', 'Romance', 'Sci-Fi', 'Adventure', 'Biography', 'Comedy', 'Sport', 'Thriller', 'Music', 'Mystery', 'Family', 'Horror', 'Fantasy', 'History', 'Animation', 'Action', 'Crime', 'Drama'
];
  
  constructor(private route: ActivatedRoute,
    private movieService: MovieService,
    private _router: Router) { }
    @ViewChild('movieForm', {static: false}) movieForm: NgForm | undefined;
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.movieId = params['id'];
        if(this.movieId){
        this.movieService.getMovie(this.movieId).subscribe((data: any)=>
        {
          this.movie = data;
          this.actors = data.actors;
          this.movieForm?.control.patchValue(this.movie?this.movie:{});
        });
      }
      });
    }

  save(val:any){
    const payload = {...val, actors :this.actors, year: new Date(val.releaseDate).getFullYear()};
    payload.posterurl = [payload.posterurl];
    console.log(payload);


    if(this.movieId){
    this.movieService.updateMovie(this.movieId, payload).subscribe((resp: any)=>
    {
      console.log(resp);
    });
  }else{
    this.movieService.createMovie(payload).subscribe((resp: any)=>
    {
      console.log(resp);
      this._router.navigate(['/latest-movies']);
      
    });
  }

  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  actors: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our actor
    if (value) {
      this.actors.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(actor: string): void {
    const index = this.actors.indexOf(actor);

    if (index >= 0) {
      this.actors.splice(index, 1);
    }
  }
  reset(){
    this.actors = [];
  }
}

