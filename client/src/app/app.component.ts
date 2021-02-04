import { Component } from '@angular/core';
import { Market } from './models/market.model';
import { AuthenticationService } from './services/authentication.service';
import { MarketService } from './services/market.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clients';

  constructor(private authService: AuthenticationService) {
    if (this.authService.getLoggedUser() != null) {
      this.authService
        .validateToken()
        .then((res) => this.authService.setLoggedUser(res), err => this.authService.setLoggedUser(null));
    }
  }
}
