import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterPipe } from 'src/app/shared/filter.pipe';
import { Movie } from '../models';

@Component({
  selector: 'app-movie-info-card',
  templateUrl: './movie-info-card.component.html',
  styleUrls: ['./movie-info-card.component.scss'],
  standalone: true,
  imports: [CommonModule, FilterPipe, FormsModule],
})
export class MovieInfoCardComponent {
  @Input() movies: Movie[] | any = [];
  filter: string = '';
  imageNotAvailable: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.imageNotAvailable = '../../../../assets/img/Image_not_available.png';
  }

  goToDetails(movie: Movie) {
    if (movie && movie.imdbID) {
      this.router.navigate(['/movies', movie.imdbID]);
    }
  }
}
