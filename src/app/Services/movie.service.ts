import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Movie } from '../Models/movie.modal';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
    apiURL = 'http://localhost:3000';
    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    
    // HttpClient API get() method => Fetch Movies list
    getMovies(): Observable<Movie> {
      return this.http
        .get<Movie>(this.apiURL + '/Movies')
        .pipe(retry(1), catchError(this.handleError));
    }




    
    // HttpClient API get() method => Fetch Movie
    getMovie(id: any): Observable<Movie> {
      return this.http
        .get<Movie>(this.apiURL + '/Movies/' + id)
        .pipe(retry(1), catchError(this.handleError));
    }
    
    // HttpClient API post() method => Create Movie
    createMovie(Movie: any): Observable<Movie> {
      return this.http
        .post<Movie>(
          this.apiURL + '/Movies',
          JSON.stringify(Movie),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }
    
    // HttpClient API put() method => Update Movie
    updateMovie(id: any, Movie: any): Observable<Movie> {
      return this.http
        .put<Movie>(
          this.apiURL + '/Movies/' + id,
          JSON.stringify(Movie),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }
    
    // HttpClient API delete() method => Delete Movie
    deleteMovie(id: any) {
      return this.http
        .delete<Movie>(this.apiURL + '/Movies/' + id, this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));
    }
    
    // Error handling
    handleError(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(() => {
        return errorMessage;
      });
    }
  
}
