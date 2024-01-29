import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { MoviesEndpointService } from 'src/app/services';
import { HttpService } from 'src/app/services/http-service.service';
import { Movie, MoviesSearchDto } from './movies.model';
import { FilterMovies } from './filter.model';
import { MovieDetail } from './movie-detail';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpService,
    private apiEndpointService: MoviesEndpointService,
  ) { }

  getMovies(filter: FilterMovies): Observable<Movie[]> {
    const apiKey = '1c57ab32';
    let httpParams = new HttpParams().set('apikey', apiKey);
    // httpParams = httpParams.set('s', 'batman');

    if (filter.Title) {
      httpParams = httpParams.set('s', filter.Title);
    }

    if (filter.Type) {
      httpParams = httpParams.set('type', filter.Type);
    }

    if (filter.Year) {
      httpParams = httpParams.set('y', filter.Year);
    }

    // if (filter.id) {
    //   httpParams = httpParams.set('i', filter.id);
    // }

    return this.http
      .get<MoviesSearchDto>(this.apiEndpointService.getMovies(), httpParams)
        .pipe(
          map(x => x.Search),
          // tap((results: Movies[]) => results = results.slice(1, 10))
          )
  }

  getMovieById(id: string) {
    const apiKey = '1c57ab32';
    let httpParams = new HttpParams().set('apikey', apiKey).set('i', id);

    return this.http
    .get<MovieDetail>(this.apiEndpointService.getMovies(), httpParams);
  }
}
