import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateRequest } from 'src/app/models/authenticate-request.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder : FormBuilder, 
    private authService : AuthenticationService,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      let request : AuthenticateRequest = {
        Email : this.loginForm.get('email').value,
        Password : this.loginForm.get('password').value,
      }

      this.authService.login(request).subscribe(
        res => { 
          this.authService.setLoggedUser(res);
          this.router.navigateByUrl('').then();
         });
    }
  }

}
