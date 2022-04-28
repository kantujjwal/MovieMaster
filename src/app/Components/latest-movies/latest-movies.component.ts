import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie.modal';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-latest-movies',
  templateUrl: './latest-movies.component.html',
  styleUrls: ['./latest-movies.component.scss']
})
export class LatestMoviesComponent implements OnInit {
  latestMovies: Movie[] = [];
  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: any)=>
    {
      this.latestMovies = data.sort((a:any,b:any)=>
      {
        return b.releaseDate.localeCompare(a.releaseDate);
      });
    });
  }

  movieDeleted(id:string){
    const index = this.latestMovies.findIndex(x=>x.id===id);

    if (index >= 0) {
      this.latestMovies.splice(index, 1);
    }
  }

}
