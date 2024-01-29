import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MoviesEndpointService {

  public getMovies(): string {
    return ('https://www.omdbapi.com');
  }
}
