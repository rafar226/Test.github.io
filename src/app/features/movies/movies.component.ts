import { Component } from '@angular/core';
import { Observable, firstValueFrom, map, tap } from 'rxjs';
import { MoviesService } from './movies.service';
import { Movie } from './movies.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MoviesControls, MoviesFormHelper } from './movies-form.model';
import { FilterMovies } from './filter.model';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  movies$!: Observable<Movie[] | undefined>;
  moviesFilterForm!: FormGroup;
  controls!: MoviesControls;
  years: Array<number> = [];
  noResult: boolean = false;
  types = [
    {
      name: 'Movie',
      value: 'movie',
    },
    {
      name: 'Serie',
      value: 'series',
    },
    {
      name: 'Episode',
      value: 'episode',
    },
    {
      name: 'All',
      value: '',
    },
  ];

  constructor(
    private moviesService: MoviesService,
    private fb: FormBuilder,
    private layoutService: LayoutService) {}

  ngOnInit() {
    this.createForm();
    this.createYearsArray();
    this.layoutService.changeHeaderCheckboxState();
  }

  filterData() {
    const filter: FilterMovies = {
      Title: this.controls.title?.value,
      Year: this.controls.year?.value,
      Type: this.controls.type?.value,
      id: this.controls.id?.value,
    };

    this.movies$ = this.moviesService.getMovies(filter).pipe(
      tap((results: Movie[]) => {
        if (results === undefined) {
          this.noResult = true;
        }
        return results;
      })
    );
  }

  resetFilters() {
    MoviesFormHelper.clearForm(this.moviesFilterForm);
  }

  private createYearsArray() {
    const currentYear = new Date().getFullYear();

    for (let i = 1900; i <= currentYear; i++) {
      this.years.push(i);
    }
  }

  private createForm(): void {
    this.moviesFilterForm = MoviesFormHelper.createForm(this.fb);
    this.controls = MoviesFormHelper.buildFormValues(this.moviesFilterForm);
  }
}
