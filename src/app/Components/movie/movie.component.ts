import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie.modal';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input('Movie') Movie: Movie | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
