import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export default abstract class BaseService<T> {
  baseURI = "http://localhost:3000";

  abstract subRoute: string;

  options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  constructor(private http: HttpClient) {}

  get(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseURI}/${this.subRoute}/${id}`);
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseURI}/${this.subRoute}`);
  }

  patch(id: string, model: T): Observable<T> {
    return this.http.patch<T>(
      `${this.baseURI}/${this.subRoute}/${id}`,
      model,
      this.options,
    );
  }

  post(model: T): Observable<T> {
    return this.http.post<T>(
      `${this.baseURI}/${this.subRoute}`,
      model,
      this.options,
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(
      `${this.baseURI}/${this.subRoute}/${id}`
    );
  }
}
