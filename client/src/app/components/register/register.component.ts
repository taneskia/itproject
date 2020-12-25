import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Compare } from 'src/app/helpers/compare.validator';
import { RegisterRequest } from 'src/app/models/register-request.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;

  constructor(
    private formBuilder : FormBuilder, 
    private authService : AuthenticationService,
    private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required]],
      confirmPassword : ['',[Validators.required]],
      userRole: [Validators.required]
    },
    {
      validator : Compare('password', 'confirmPassword')
    });
   }

  ngOnInit(): void {
  }

  register(): void {
    if (this.registerForm.valid) {
      let request : RegisterRequest = {
        Name : this.registerForm.get('name').value,
        Email : this.registerForm.get('email').value,
        Password : this.registerForm.get('password').value,
        ConfirmPassword : this.registerForm.get('confirmPassword').value,
        Role: this.registerForm.get('userRole').value,
        ImageUrl : ' '
      }

      this.authService.register(request).subscribe(
        res => { 
          console.log(res); 
          this.router.navigateByUrl('').then();
        });
    }
  }

}
