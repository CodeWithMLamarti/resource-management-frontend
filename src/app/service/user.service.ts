import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserDto} from "../response/UserDto";
import {UserUpdateDto} from "../response/UserUpdateDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  updateUser(user: UserUpdateDto) {
    const url = this.baseUrl + "/users/update/" + user.id;
    return this.http.patch<void>(url, user);
  }

  deleteUser(id: number) {
  const url = this.baseUrl + "/users/delete/" + id;
    return this.http.delete<string>(url);
  }
  getAllUsers() {
    const url = this.baseUrl + "/users/users";
    return this.http.get<UserDto[]>(url);
  }

  getUser(id: number) {
    const url = this.baseUrl + "/users/user/" + id;
    return this.http.get<UserDto>(url);
  }
}
