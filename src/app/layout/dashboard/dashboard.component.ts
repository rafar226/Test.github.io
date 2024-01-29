import { Component } from "@angular/core";
import { LayoutService } from "src/app/services/layout.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private layoutService: LayoutService){}

  ngOnInit() {
    this.layoutService.changeHeaderCheckboxState();
  }

  imgUrl: string = '../../../assets/img/caritas-negras@2x.png'
}
