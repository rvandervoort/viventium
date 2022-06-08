import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import IPost from "src/app/models/post.interface";
import PostService from 'src/app/services/post.service';

import { take } from "rxjs";

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

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) {}

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

  updatePost(post: IPost){
    const index = this.posts.findIndex((item:IPost) => item.id === post.id);
    if (index < 0){
      this.posts.push(post);
    }
    this.posts[index] = post;
    this.posts.sort();

    this.updateFilteredPosts()
    this.getAllTags()
  }

  deletePost(postId: string){
    this.posts = [ ...this.posts.filter((item:IPost) => item.id !== postId) ];

    this.updateFilteredPosts()
    this.getAllTags();
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

  onNewPost(event: Event | IPost | null): void {
    if (event !== null) {
      (event as IPost).id = this.getNewId();
      this.postService
        .post(event as IPost)
        .pipe(take(1))
        .subscribe(() => {
          this.posts.push((event as IPost));
          this.updateFilteredPosts()
          this.getAllTags();
        });
    }
  }

  getNewId(): string {
    return `${parseInt(this.posts.sort()[this.posts.length - 1].id ?? "0") + 1}`;
  }
}
