import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthenticationService,
    private cookieService: CookieService) {
      this.authService.loggedInUser$.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout().subscribe(
      () => {
        this.authService.setLoggedUser(null);
        this.currentUser = null;
      },
      (error) => console.log(error)
    );
  }
}
