import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./service/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.validateToken(token).subscribe({
        next: (res) => {
          localStorage.setItem("role", res.role);
          if(localStorage.getItem("role") === "EMPLOYEE") {
            this.router.navigate(['/user-profile']);
          } else {
            this.router.navigate(['/dashboard']);
          }

        },
        error: (error) => {
          // Token is invalid, redirect to login
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        }
      });
    } else {
      localStorage.removeItem('authToken');
      this.router.navigate(['/login']);
    }
  }

}
