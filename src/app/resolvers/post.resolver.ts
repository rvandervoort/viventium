import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import IPost from "../models/post.interface";
import PostService from "../services/post.service";

@Injectable({
  providedIn: "root",
})
export default class PostResolver implements Resolve<IPost[]> {
  constructor(private postService: PostService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<IPost[]> {
    return this.postService.getAll();
  }
}
