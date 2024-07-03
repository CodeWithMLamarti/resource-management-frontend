import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Break} from "../request/Break";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BreakService {

  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/breaks`
  }
  requestBreak(breakRequest: Break): Observable<Break> {
    return this.http.post<Break>(`${this.baseUrl}/request`, breakRequest);
  }

  getAllBreakRequests(): Observable<Break[]> {
    return this.http.get<Break[]>(`${this.baseUrl}/all`);
  }

  getBreaksByUserId(userId: number): Observable<Break[]> {
    return this.http.get<Break[]>(`${this.baseUrl}/user/${userId}`);
  }

  approveBreakByHR(breakId: number): Observable<Break> {
    return this.http.put<Break>(`${this.baseUrl}/approve/hr/${breakId}`, {});
  }

  approveBreakByManager(breakId: number): Observable<Break> {
    return this.http.put<Break>(`${this.baseUrl}/approve/manager/${breakId}`, {});
  }

  rejectBreak(breakId: number): Observable<Break> {
    return this.http.put<Break>(`${this.baseUrl}/reject/${breakId}`, {});
  }
}
