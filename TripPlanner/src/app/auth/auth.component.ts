import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthenticationControllerService } from 'src/shared/core/api/authentication-controller/authentication-controller.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceToken } from './auth-service.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  standalone: true,
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  authForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationControllerService,
    private snackBar: MatSnackBar,
    private authServiceToken: AuthServiceToken
  ) {
    this.authForm = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.isLoginMode = url[0].path === 'login';
      if (this.isLoginMode) {
        this.authForm.get('username')?.clearValidators();
      } else {
        this.authForm.get('username')?.setValidators([Validators.required]);
      }
      this.authForm.get('username')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    if (this.isLoginMode) {
      // Login logic
      const loginData = { email, password };
      this.authService.authenticate(loginData).subscribe({
        next: response => {
          if (!response.token) {
            this.snackBar.open('Login failed', 'Close', {
              duration: 10000,
              verticalPosition: 'top'
            });
            this.errorMessage = 'Login failed';
            return;
          }
          this.snackBar.open('Has iniciado sesón', 'Close', {
            duration: 10000,
            verticalPosition: 'top'
          });
          this.authServiceToken.setToken(response.token);
          //localStorage.setItem('access_token', response.token); 
          localStorage.setItem('userEmail', email);
          this.router.navigate(['/']); // Redirigir a la página principal u otra página
        },
        error: error => {
          this.errorMessage = 'Login failed';
          this.snackBar.open('Login failed', 'Close', {
            duration: 10000,
            verticalPosition: 'top'
          });
          //localStorage.removeItem('access_token');
          this.authServiceToken.clearToken();
        }
      });
    } else {
      // Signup logic
      const username = this.authForm.value.username;
      const registerData = { email: email, fullName: username, password: password };
      this.authService.register(registerData).subscribe({
        next: response => {
          this.snackBar.open('Registration successful. Please log in.', 'Close', {
            duration: 10000,
            verticalPosition: 'top'
          });
          this.router.navigate(['/login']); 
        },
        error: error => {
          this.errorMessage = 'Registration failed';
        }
      });
    }
  }
}
