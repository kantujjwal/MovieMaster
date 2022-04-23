import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie.modal';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies: Movie[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
  }

  searchMovies(value: any){
    this.movieService.getMovies().subscribe((data: any)=>
    {
      this.movies = data.filter((x: any)=>x.name.toLowerCase() == value.name.toLowerCase());
    });
  }
}
