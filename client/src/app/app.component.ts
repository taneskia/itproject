import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clients';

  constructor(private authService: AuthenticationService) {
    if (this.authService.getLoggedUser() != null) {
      this.authService.validateToken().subscribe(
        (res) => this.authService.setLoggedUser(res),
        () => this.authService.logout()
      );
    }
  }
}
