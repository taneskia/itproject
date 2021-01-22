import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthenticationService) {
    this.authService.loggedInUser$.subscribe((x) => (this.currentUser = x));
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
