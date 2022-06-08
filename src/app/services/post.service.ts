import IPost from "../models/post.interface";
import BaseService from "./base.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export default class PostService extends BaseService<IPost> {
  subRoute = "posts";
}
