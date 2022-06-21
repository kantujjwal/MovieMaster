import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, tap, finalize } from 'rxjs';

@Injectable()
export class LogInterceptor implements HttpInterceptor {
  
  constructor() { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {

    const startTime = Date.now();

    let status: string;
    let resp: any;
    return next.handle(req).pipe(
      tap(res=>{
        status = ''
        if(res instanceof HttpResponse){
          status = 'succeeded'
        }
        resp = res;
      },
      error=> {
        status = "failed";
        resp = error;
      }),
      finalize(()=>{
        const elapsedTime = Date.now() - startTime;
      
        console.log('Req:', req, resp, elapsedTime);
      })
      );
  }
}
