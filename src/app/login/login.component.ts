import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../service/auth.service";
import {LoginRequest} from "../request/LoginRequest";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest = new LoginRequest(this.loginForm.get("email").value, this.loginForm.get("password").value);
      this.authService.login(loginRequest).subscribe({
        next: res => {
          this.errorMessage = false;
          if(!!res.token) {
            localStorage.setItem("authToken", res.token);
            localStorage.setItem("role", res.role);
            console.log("cc");
            this.router.navigate(["/dashboard"]);


          } else {

            console.log("cv");
            this.errorMessage = true;
          }
        },
        error: err => {
          this.errorMessage = true;
        }

      })
      console.log('Form Submitted!', this.loginForm.value);
    }
  }
}
