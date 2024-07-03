import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {UserDto} from "../response/UserDto";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: UserDto;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.validateToken(localStorage.getItem("authToken")).subscribe({
      next: res => {
        this.userService.getUser(res.id).subscribe(res => this.user = res);
      },
      error: err => console.log('Error loading user data', err)
    });
  }


}
