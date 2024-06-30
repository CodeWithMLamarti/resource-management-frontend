import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {UserDto} from "../response/UserDto";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersList: UserDto[];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: res => this.usersList = res,
      error: err => console.log("users-list", err)
    })
  }

  editUser(id: number) {
    
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: res => {
        console.log(res);
        this.usersList = [...this.usersList.filter(user => user.id != id)];
      },
      error: err => {
        console.log("error user list: ", err);
        this.usersList = [...this.usersList.filter(user => user.id != id)];
      }
    })
  }
}
