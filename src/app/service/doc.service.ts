import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {DocDto} from "../request/DocDto";
import * as url from "url";

@Injectable({
  providedIn: 'root'
})
export class DocService {

  private baseUrl;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.baseUrl}/docs`;
  }

  docRequest(doc: DocDto) {
    const url = this.baseUrl + "/create";
    return this.http.post<DocDto>(url, doc);
  }

  getDocsById(id: number) {
    const url = this.baseUrl + "/" + id;
    return this.http.get<DocDto[]>(url);
  }

  getAllDocs() {
    const url = this.baseUrl + "/";
    return this.http.get<DocDto[]>(url);
  }

  deleteRequest(id: number) {
    const url = this.baseUrl + "/" + id;
    return this.http.delete(url);
  }
}
