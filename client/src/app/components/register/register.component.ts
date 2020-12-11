import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private formBuilder : FormBuilder, private authService : AuthenticationService) {
    this.registerForm = this.formBuilder.group({
      email : ['',[Validators.required, Validators.email]],
      password : ['',[Validators.required]],
      confirmPassword : ['',[Validators.required]],
    },
    {
      validator : Compare('password', 'confirmPassword')
    })
   }

  ngOnInit(): void {
  }

  register(): void {
    if(this.registerForm.valid){
      let request : RegisterRequest = {
        Title : "request",
        FirstName : "Pero",
        LastName : "Pero",
        Email : this.registerForm.get('email').value,
        Password : this.registerForm.get('password').value,
        ConfirmPassword : this.registerForm.get('confirmPassword').value,
        AcceptTerms : true
      }
      this.authService.register(request).subscribe(
        res => {console.log(res)},
        err => {console.log('Error:' + err)});
    }
  }

}
