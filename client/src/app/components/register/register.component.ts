import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from 'src/app/models/register-request.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showAlert: boolean = false;
  showSpinner: boolean = false;
  success: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      userRole: [Validators.required],
    });

    this.showAlert = false;
    this.showSpinner = false;
    this.success = false;
  }

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.valid) {
      this.showAlert = false;
      this.showSpinner = true;

      let request: RegisterRequest = {
        Name: this.registerForm.get('name').value,
        Email: this.registerForm.get('email').value,
        Password: this.registerForm.get('password').value,
        ConfirmPassword: this.registerForm.get('confirmPassword').value,
        Role: this.registerForm.get('userRole').value,
        ImageUrl: ' ',
      };

      this.authService.register(request).subscribe(
        () => {
          this.showAlert = false;
          this.success = true;
        },
        () => {
          this.showAlert = true;
          this.success = false;
        }
      );
    }
  }
}
