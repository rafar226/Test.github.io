import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { MoviesEndpointService } from 'src/app/services';
import { HttpService } from 'src/app/services/http-service.service';
import { FilterMovies, Movie, MovieDetail, MoviesSearchDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(
    private http: HttpService,
    private apiEndpointService: MoviesEndpointService
  ) {}

  getMovies(filter: FilterMovies): Observable<Movie[]> {
    const apiKey = '1c57ab32';
    let httpParams = new HttpParams().set('apikey', apiKey);

    if (filter.Title) {
      httpParams = httpParams.set('s', filter.Title);
    }

    if (filter.Type) {
      httpParams = httpParams.set('type', filter.Type);
    }

    if (filter.Year) {
      httpParams = httpParams.set('y', filter.Year);
    }

    return this.http
      .get<MoviesSearchDto>(this.apiEndpointService.getMovies(), httpParams)
      .pipe(map((x) => x.Search));
  }

  getMovieById(id: string) {
    const apiKey = '1c57ab32';
    let httpParams = new HttpParams().set('apikey', apiKey).set('i', id);

    return this.http.get<MovieDetail>(
      this.apiEndpointService.getMovies(),
      httpParams
    );
  }
}
