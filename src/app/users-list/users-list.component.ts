import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {UserDto} from "../response/UserDto";
import {Sort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersList: UserDto[];
  usersBeforeFilter: UserDto[];
  searchInput = "";
  length: number;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: res => {
        this.usersList = res;
        this.usersBeforeFilter = [...this.usersList];
        this.length = res.length;
        this.paginate({ previousPageIndex: 0, pageIndex: this.pageIndex, pageSize: this.pageSize, length: this.length });
      },

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
        console.log(err);
      }
    })
  }

  sortData(sort: Sort) {
    this.usersList = [...this.usersBeforeFilter]
    const data = this.usersList.slice();
    if (!sort.active || sort.direction === '') {
      this.usersList = data;
      
      return;
    }

    this.usersList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'nom':
          return this.compare(a.lastName, b.lastName, isAsc);
        case 'prenom':
          return this.compare(a.firstName, b.firstName, isAsc);
        case 'matricule':
          return this.compare(a.serialNumber, b.serialNumber, isAsc);
        case 'personnel':
          return this.compare(a.job, b.job, isAsc);
        case 'role':
          return this.compare(a.role, b.role, isAsc);
        default:
          return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  searchItem($event: Event) {
    if(this.searchInput.length !== 0) {
      this.usersList = [...this.usersBeforeFilter];
      const filteredList = [...this.usersList.filter(user =>
          user.firstName.includes(this.searchInput)
          || user.lastName.includes(this.searchInput)
          || user.serialNumber === + this.searchInput
          || user.job.includes(this.searchInput)
          || user.role.includes(this.searchInput)
      )];
      this.usersList = [...filteredList];
    } else {
      console.log(this.usersBeforeFilter)
      this.usersList = [...this.usersBeforeFilter];
    }

  }

  handlePageEvent($event: PageEvent) {
    console.log($event);
    this.length = $event.length;
    this.pageSize = $event.pageSize;
    this.pageIndex = $event.pageIndex;
    const previousPageIndex = $event.previousPageIndex;
    const pageIndex = $event.pageIndex;
    const pageSize = $event.pageSize;
    const length = $event.length;
    this.usersList = this.paginate({previousPageIndex, pageIndex, pageSize, length});
  }

  paginate({ previousPageIndex, pageIndex, pageSize, length }) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    return [...this.usersBeforeFilter].slice(startIndex, endIndex);
  }
}
