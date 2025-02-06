import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class WeatherService {
    private baseUrl = 'https://jsonmock.hackerrank.com/api/weather';

    constructor(private http: HttpClient) { }

    getWeather(city: string): Observable<any> {
        const startTime = performance.now();
      
        return this.http.get<any>(`${this.baseUrl}?name=${city}`).pipe(
          tap(() => {
            const endTime = performance.now();
            const duration = endTime - startTime;
            console.log(`⏳ API Response Time for ${city}: ${duration.toFixed(2)} ms`);
          })
        );
      }

    testServerTiming(): Observable<any>  {
        return this.http.get<any>('https://httpbin.org/response-headers?Server-Timing=total;dur=123')
    }
}