import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: number = 0;
  isSubmitting: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  })

  registerForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(8)])
  })
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private messagingService: MessagingService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.isSubmitting = true;
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(responseData => {
      this.authService.setSession(responseData);
      this.messagingService.requestPermission()
      this.router.navigate(["/"])
    }, error => {
        this.isSubmitting = false;
        this.snackBar.open(error.message, "Close", {
          duration: 2000
        });
    })
  }

  register() {
    this.isSubmitting = true;
    this.authService.register(this.registerForm.controls.email.value, this.registerForm.controls.password.value).subscribe(responseData => {
      this.authService.setSession(responseData);
      this.router.navigate(["/"])
    }, error => {
        this.isSubmitting = false;
        this.snackBar.open(error.message, "Close", {
          duration: 2000
        })
    });
  }

  goToLogin() { this.form = 0 }
  goToRegister() { this.form = 1 }

}
