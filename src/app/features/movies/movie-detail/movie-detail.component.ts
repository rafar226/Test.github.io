import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { catchError, tap, throwError } from 'rxjs';
import { MovieDetail } from '../movie-detail';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movieId: string = '';
  currentMovie: MovieDetail | undefined = undefined;
  id: boolean = true;
  imageNotAvailable: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.movieId = this.route.snapshot.paramMap.get('id') || '';
    this.imageNotAvailable = '../../../../assets/img/Image_not_available.png';

    if (this.movieId) {
      this.movieService
        .getMovieById(this.movieId)
        .pipe(
          catchError((err) => {
            this.id = false;
            return throwError(err);
          }),
          tap((data) => {
            if (data.Error) {
              this.id = false;
              return;
            }
            this.currentMovie = data;
          })
        )
        .subscribe();
    } else {
      this.id = false;
    }
  }

  backToMovies() {
    this.router.navigate(['/movies']);
  }
}
