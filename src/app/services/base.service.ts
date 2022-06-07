import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export default abstract class BaseService<T> {
  baseURI = "http://localhost:3000";

  abstract subRoute: string;

  constructor(private http: HttpClient) {}

  get(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseURI}/${this.subRoute}/${id}`);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseURI}/${this.subRoute}`);
  }
}
