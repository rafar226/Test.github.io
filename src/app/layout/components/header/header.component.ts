import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('inputCheckbox', { static: false }) inputCheckbox!: ElementRef;
  logo = '../../../../assets/img/logo@2x.png';

  constructor(private layoutService: LayoutService) {}

  ngAfterViewInit() {
    this.layoutService.headerEventSubject$.subscribe(
      (checkboxState: boolean) => {
        this.selectCheckbox(checkboxState);
      }
    );
  }

  selectCheckbox(checkboxState: boolean) {
    let checkbox = this.inputCheckbox.nativeElement.value;
    checkbox = checkboxState === true ? 'on' : 'off';
    this.inputCheckbox.nativeElement.checked = false;
  }
}
