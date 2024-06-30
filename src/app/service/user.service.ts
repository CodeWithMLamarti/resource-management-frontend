import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserDto} from "../response/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  deleteUser(id: number) {
  const url = this.baseUrl + "/users/delete/" + id;
    return this.http.delete<string>(url);
  }
  getAllUsers() {
    const url = this.baseUrl + "/users/users";
    return this.http.get<UserDto[]>(url);
  }
}
