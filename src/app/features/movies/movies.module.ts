import { NgModule } from '@angular/core';
import { MoviesComponent } from './movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieInfoCardComponent } from './movie-info-card/movie-info-card.component';

@NgModule({
  declarations: [MoviesComponent, MovieDetailComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    ReactiveFormsModule,
    MovieInfoCardComponent,
  ],
})
export class MoviesModule {}
