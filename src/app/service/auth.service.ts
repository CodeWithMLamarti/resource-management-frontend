import {Injectable} from '@angular/core';
import {LoginRequest} from "../request/LoginRequest";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, tap} from "rxjs";
import next from "ajv/dist/vocabularies/next";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private role: string;
  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest) {
    const url = this.baseUrl + "/auth/authenticate";
    return this.http.post<{ token: string, role: string }>(url, loginRequest).pipe(
        tap({
          next: res => {this.role = localStorage.getItem("role") ? localStorage.getItem("role") : res.role;},
          error: err => {this.role = null;}
        })
    );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  validateToken(token: string): Observable<any> {
    const validateTokenUrl = this.baseUrl + "/auth/validate-token"
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(validateTokenUrl, { headers }).pipe(
        tap(res => {
          console.log(res);
        })
    );
  }

  getRole() {
    return this.role;
  }
}
