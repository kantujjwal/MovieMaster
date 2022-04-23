import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/Models/movie.modal';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {
  movieId: string | undefined;
  movie: Movie | undefined;
  constructor(private route: ActivatedRoute,
    private movieService: MovieService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = params['id'];
      this.movieService.getMovie(this.movieId).subscribe((data: any)=>
      {
        this.movie = data;
      });
    });
  }

}