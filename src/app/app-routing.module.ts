import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { LatestMoviesComponent } from './Components/latest-movies/latest-movies.component';
import { MovieDetailComponent } from './Components/movie-detail/movie-detail.component';
import { MovieEditComponent } from './Components/movie-edit/movie-edit.component';
import { MovieListComponent } from './Components/movie-list/movie-list.component';
import { IntrestCalculaterComponent } from './Components/intrest-calculater/intrest-calculater.component';
import { MoviecartComponent } from './Components/moviecart/moviecart.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthUserGuard } from './guard/auth-user.guard';
import { AuthAdminGuard } from './guard/auth-admin.guard';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

const routes: Routes = [{ path:'', redirectTo: '/latest-movies', pathMatch:'full'},
{ path:'latest-movies', component: LatestMoviesComponent },
{ path:'contactus', component: ContactUsComponent, canActivate: [AuthUserGuard] },
{ path:'movie-list', component: MovieListComponent, canActivate: [AuthUserGuard]  },
{ path:'intrest-calc', component: IntrestCalculaterComponent, canActivate: [AuthAdminGuard]  },
{ path:'movie-details/:id', component: MovieDetailComponent, canActivate: [AuthUserGuard]  },
{ path:'movie-edit/:id', component: MovieEditComponent, canActivate: [AuthAdminGuard]  },
{ path:'new-movie', component: MovieEditComponent, canActivate: [AuthAdminGuard]  },
{ path:'movie-cart', component: MoviecartComponent, canActivate: [AuthUserGuard] },
{ path:'login', component: LoginComponent},
{ path:'**', component: PageNotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
