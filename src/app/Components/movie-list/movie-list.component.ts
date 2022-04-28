import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Movie } from 'src/app/Models/movie.modal';
import { MovieService } from 'src/app/Services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  @ViewChild('searchForm', {static: false}) searchForm: NgForm | undefined;
  genreList = ['Crime', 'Drama', 'Musical', 'Action', 'Romance', 'Sci-Fi', 'Adventure', 'Biography', 'Comedy', 'Sport', 'Thriller', 'Music', 'Mystery', 'Family', 'Horror', 'Fantasy', 'History', 'Animation', 'Action', 'Crime', 'Drama'
];
  movies: Movie[] = [];
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  actors: string[] = [];
  loaded = false;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    setTimeout(()=>this.repopulateSearchForm(),100);
  }

  repopulateSearchForm(){
    let filterData: any = localStorage.getItem('filterData');
    if(filterData){
      filterData = JSON.parse(filterData);
      this.actors = filterData.actors;      
      this.searchForm?.control.patchValue(filterData?filterData:{});
      this.searchMovies(filterData);
    }
    console.log('filterData', filterData);
  }

  searchMovies(value: any){
    console.log(value, this.actors);
    if(this.actors.length>0 || value.genres || value.minDuration || value.maxDuration || value.fromDate || value.toDate || value.title|| value.storyline){
      localStorage.setItem('filterData',JSON.stringify({...value, actors: this.actors}));
    }
    let filteredData=[];
    this.movieService.getMovies().subscribe((data: any)=>
    {
      filteredData = data;
      
      if(value.genres){
        filteredData = filteredData.filter((x: any)=> value.genres.every((v: any) => x.genres.includes(v)));
      }

      if(this.actors && this.actors.length >0){
        filteredData = filteredData.filter((x: any)=> this.actors.every((v: any) => 
        x.actors.findIndex((z:string)=>z.toLowerCase().includes(v.toLowerCase()))>=0
        ));
      }
       
      // if(value.maxDuration || value.minDuration){
      //   filteredData = filteredData.filter((x: any)=> Number(x.duration)>=Number(value.minDuration?value.minDuration:'0') && Number(x.duration)<= Number(value.maxDuration?value.maxDuration:'9999999999999999'));
      // }

      if(value.minDuration){
        filteredData = filteredData.filter((x: any)=> Number(x.duration)>=Number(value.minDuration));
      }

      if(value.maxDuration){
        filteredData = filteredData.filter((x: any)=> Number(x.duration)<=Number(value.maxDuration));
      }



      if(value.fromDate){
        filteredData = filteredData.filter((x: any)=> new Date(x.releaseDate)>=new Date(value.fromDate));
      }
      if(value.toDate){
        filteredData = filteredData.filter((x: any)=> new Date(x.releaseDate)<=new Date(value.toDate));
      }


      if(value.title){
        filteredData = filteredData.filter((x: any)=>x.title.toLowerCase().includes(value.title.toLowerCase().trim()));
      }

      if(value.storyline){
        filteredData = filteredData.filter((x: any)=>x.storyline.toLowerCase().includes(value.storyline.toLowerCase().trim()));
      }

      this.movies = filteredData;
      this.loaded = true;
    });
  }

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
    localStorage.removeItem('filterData');
    this.loaded = false;
    this.movies = [];
  }
}
