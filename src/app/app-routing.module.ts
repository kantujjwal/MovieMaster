import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { LatestMoviesComponent } from './Components/latest-movies/latest-movies.component';
import { MovieListComponent } from './Components/movie-list/movie-list.component';

const routes: Routes = [{ path:'latest-movies', component: LatestMoviesComponent },
{ path:'contactus', component: ContactUsComponent },
{ path:'movie-list', component: MovieListComponent },
{ path:'', redirectTo: '/latest-movies', pathMatch:'full'},
{ path:'*', redirectTo: 'latest-movies'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
