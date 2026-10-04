import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loginError = false;
  loginSuccess = false;
  isLoggedIn = false;

  onSubmit(): void {
    this.loginError = false;
    this.loginSuccess = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.loginForm.getRawValue();

    if (username === 'test@example.com' && password === 'Password123') {
      this.loginSuccess = true;
      this.isLoggedIn = true;
    } else {
      this.loginError = true;
    }
  }
}