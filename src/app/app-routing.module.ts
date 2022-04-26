import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { LatestMoviesComponent } from './Components/latest-movies/latest-movies.component';
import { MovieDetailComponent } from './Components/movie-detail/movie-detail.component';
import { MovieEditComponent } from './Components/movie-edit/movie-edit.component';
import { MovieListComponent } from './Components/movie-list/movie-list.component';
import { IntrestCalculaterComponent } from './Components/intrest-calculater/intrest-calculater.component';

const routes: Routes = [{ path:'latest-movies', component: LatestMoviesComponent },
{ path:'contactus', component: ContactUsComponent },
{ path:'movie-list', component: MovieListComponent },
{ path:'intrest-calc', component: IntrestCalculaterComponent },
{ path:'movie-details/:id', component: MovieDetailComponent },
{ path:'movie-edit/:id', component: MovieEditComponent },
{ path:'', redirectTo: '/latest-movies', pathMatch:'full'},
{ path:'*', redirectTo: 'latest-movies'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
