import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { MoviesService } from './movies.service';
import { LayoutService } from 'src/app/services/layout.service';
import { FilterMovies, Movie, MoviesControls, MoviesFormHelper } from './models';

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
  showTitleWarning: boolean = false;
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
    if(!this.moviesFilterForm.valid) {
      this.showTitleWarning = true;
      return;
    }
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
