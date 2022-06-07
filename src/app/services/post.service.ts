import IPost from "../models/post.interface";
import BaseService from "./base.service";

export default class PostService extends BaseService<IPost> {
  subRoute = "post";
}
