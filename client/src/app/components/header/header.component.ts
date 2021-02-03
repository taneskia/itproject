import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthenticationService, private router: Router) {
    this.currentUser = this.authService.getLoggedUser();
  }

  ngOnInit(): void {}

  logout() {
    this.authService.logout().then(() => {
      this.authService.setLoggedUser(null);
      this.currentUser = null;
      this.router.navigateByUrl('/');
    }, 
    err => console.log(err));
  }
}
