import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import IPost from "../models/post.interface";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export default class PostComponent implements OnInit {
  posts: IPost[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.posts = (
      this.activatedRoute.snapshot.data as { posts: IPost[] }
    ).posts;
  }
}
