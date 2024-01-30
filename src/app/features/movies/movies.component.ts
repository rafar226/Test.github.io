import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, combineLatestWith, from, map, merge, of, tap } from 'rxjs';
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
  filter: FilterMovies = {
    page: 1,
  };
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
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.createForm();
    this.createYearsArray();
    this.layoutService.changeHeaderCheckboxState();
  }

  filterData() {
    if (!this.moviesFilterForm.valid) {
      this.showTitleWarning = true;
      return;
    }
    this.filter = {
      Title: this.controls.title?.value,
      Year: this.controls.year?.value,
      Type: this.controls.type?.value,
      id: this.controls.id?.value,
      page: 1,
    };

    this.movies$ = this.moviesService.getMovies(this.filter).pipe(
      tap((results: Movie[]) => {
        if (results === undefined) {
          this.noResult = true;
        } else {
          this.noResult = false;
        }
        return results;
      })
    );
  }

  searchMore() {
    this.filter.page = ++this.filter.page;
    this.movies$
      .pipe(
        combineLatestWith(this.moviesService.getMovies(this.filter)),
        map(([first, second]) => {
          second.forEach((x) => {
            first?.push(x);
          });
          this.movies$ = from([first]);
        })
      )
      .subscribe();
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
