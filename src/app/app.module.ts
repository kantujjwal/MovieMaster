import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { LatestMoviesComponent } from './Components/latest-movies/latest-movies.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './Components/movie/movie.component';
import { MovieListComponent } from './Components/movie-list/movie-list.component';
import { MovieDetailComponent } from './Components/movie-detail/movie-detail.component';
import { MovieEditComponent } from './Components/movie-edit/movie-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LatestMoviesComponent,
    ContactUsComponent,
    MovieComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
