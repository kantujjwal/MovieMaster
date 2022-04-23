import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/Models/movie.modal';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
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
