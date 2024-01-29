import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [LayoutRoutingModule],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  providers: [],
})
export class LayoutModule {}
