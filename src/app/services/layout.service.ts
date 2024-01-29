import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private headerEventSubject = new BehaviorSubject<boolean>(true);
  headerEventSubject$ = this.headerEventSubject.asObservable();

  constructor() { }

  changeHeaderCheckboxState() {
    this.headerEventSubject.next(true);
  }
}
