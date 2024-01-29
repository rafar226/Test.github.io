import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { catchError, tap, throwError } from 'rxjs';
import { MovieDetail } from '../movie-detail';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit{

  movieId: string = '';
  currentMovie: MovieDetail | undefined = undefined;
  id: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private router: Router)
  {}

  ngOnInit(){
      this.movieId = this.route.snapshot.paramMap.get('id') || '';

      if (this.movieId) {
        this.movieService
          .getMovieById(this.movieId)
          .pipe(
            catchError(err => {
              this.id = false;
              console.log('err')
              return throwError(err);
            }),
            tap(data => {
              console.log('data', data)
              if(data.Error) {
                this.id = false;
                console.log('err', this.id);
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

  backToMovies(){
    this.router.navigate(['/movies']);
  }
}
