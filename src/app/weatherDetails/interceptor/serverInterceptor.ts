import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class ServerTimingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Extract the Server-Timing header
          const serverTiming = event.headers.get('Server-Timing');
          if (serverTiming) {
            console.log(`Server Timing for ${req.url}:`, serverTiming);
          }
        }
      })
    );
  }
}
