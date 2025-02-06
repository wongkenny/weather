
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { WeatherDetails } from './weatherDetails/weatherDetails.component';
//Angular Router Module
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ServerTimingInterceptor } from './weatherDetails/interceptor/serverInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetails
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterTestingModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path:'', component: WeatherDetails }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: ServerTimingInterceptor, multi: true }],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
