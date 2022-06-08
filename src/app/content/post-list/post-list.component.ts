import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import IPost from "src/app/models/post.interface";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export default class PostListComponent implements OnInit {
  posts: IPost[] = [];

  filteredPosts: IPost[] = [];

  allTags: Set<string> = new Set<string>();

  selectedTags: string[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.posts = (
      this.activatedRoute.snapshot.data as { posts: IPost[] }
    ).posts;

    console.log(this.filteredPosts);
    this.getAllTags();
    this.updateFilteredPosts();
  }

  updateFilteredPosts() {
    this.filteredPosts = this.posts.filter(
      (post: IPost) =>
        this.selectedTags.length === 0 ||
        this.selectedTags.some((tag: string) => post.tags.includes(tag)),
    );
  }

  getAllTags(): void {
    this.allTags = new Set<string>(this.posts.flatMap((post) => post.tags));
  }

  toggleTag(tag: string): void {
    if (this.selectedTags.some((item: string) => item === tag)) {
      this.selectedTags = this.selectedTags.filter(
        (item: string) => item !== tag,
      );
    } else {
      this.selectedTags.push(tag);
      this.selectedTags = this.selectedTags.sort();
    }
  }
}
