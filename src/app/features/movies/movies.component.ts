import { Component } from '@angular/core';
import { Observable, firstValueFrom, map, tap } from 'rxjs';
import { MoviesService } from './movies.service';
import { Movie } from './movies.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoviesControls, MoviesFormHelper } from './movies-form.model';
import { FilterMovies } from './filter.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

  movies$!: Observable<Movie[]>;
  moviesFilterForm!: FormGroup;
  controls!: MoviesControls;
  types = [
    {
      name: 'Movie',
      value: 'movie'
    },
    {
      name: 'Serie',
      value: 'series'
    },
    {
      name: 'Episode',
      value: 'episode'
    },
    {
      name: 'All',
      value: ''
    }
  ]

  constructor(
    private moviesService: MoviesService,
    private fb: FormBuilder
    ) {
  }

  ngOnInit() {
    this.createForm();
  }

  filterData() {
    const filter: FilterMovies = {
      Title: this.controls.title?.value,
      Year: this.controls.year?.value,
      Type: this.controls.type?.value,
      id: this.controls.id?.value,
    };

    this.movies$ = this.moviesService.getMovies(filter);
  }

  resetFilters(){
    MoviesFormHelper.clearForm(this.moviesFilterForm);
  }

  private createForm(): void {
    this.moviesFilterForm = MoviesFormHelper.createForm(this.fb);
    this.controls = MoviesFormHelper.buildFormValues(this.moviesFilterForm);
  }
}
