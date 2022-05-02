import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, catchError, throwError } from 'rxjs';
import { Order } from '../Models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    apiURL = 'http://localhost:3000';
    constructor(private http: HttpClient) {}

    // Http Options
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    
    // HttpClient API get() method => Fetch Orders list
    getOrders(): Observable<Order> {
      return this.http
        .get<Order>(this.apiURL + '/Orders')
        .pipe(retry(1), catchError(this.handleError));
    }

    // HttpClient API get() method => Fetch Movie
    getOrder(id: any): Observable<Order> {
      return this.http
        .get<Order>(this.apiURL + '/Orders/' + id)
        .pipe(retry(1), catchError(this.handleError));
    }
    
    // HttpClient API post() method => Create Movie
    createOrder(order: Order): Observable<Order> {
      return this.http
        .post<Order>(
          this.apiURL + '/Orders',
          JSON.stringify(order),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }
    
    // HttpClient API put() method => Update Movie
    updateOrder(id: any, order: Order): Observable<Order> {
      return this.http
        .put<Order>(
          this.apiURL + '/Orders/' + id,
          JSON.stringify(order),
          this.httpOptions
        )
        .pipe(retry(1), catchError(this.handleError));
    }
    
    // HttpClient API delete() method => Delete Movie
    deleteOrder(id: any) {
      return this.http
        .delete<Order>(this.apiURL + '/Orders/' + id, this.httpOptions)
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