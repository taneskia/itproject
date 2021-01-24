import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateRequest } from 'src/app/models/authenticate-request.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showAlert: boolean = false;
  showSpinner: boolean = false;
  queryParams: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.showAlert = false;
    this.showSpinner = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params['auth'];
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.showAlert = false;
      this.showSpinner = true;

      let request: AuthenticateRequest = {
        Email: this.loginForm.get('email').value,
        Password: this.loginForm.get('password').value,
      };

      this.authService.login(request).subscribe(
        (res) => {
          this.authService.setLoggedUser(res);
          this.router.navigateByUrl('').then();
        },
        () => {
          (this.showAlert = true)
        }
      );
    }
  }
}
