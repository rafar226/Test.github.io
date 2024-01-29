import { Component, Input } from '@angular/core';
import { Movie } from '../movies.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FilterPipe } from 'src/app/shared/filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-info-card',
  templateUrl: './movie-info-card.component.html',
  styleUrls: ['./movie-info-card.component.scss'],
  standalone: true,
  imports: [CommonModule, FilterPipe, FormsModule]
})
export class MovieInfoCardComponent {

  @Input() movies: Movie[] | any = [];
  filter: string = '';

  constructor(private router: Router) {}

  goToDetails(movie: Movie) {
    if (movie && movie.imdbID) {
      this.router.navigate(['/movies', movie.imdbID]);
    }
  }

}