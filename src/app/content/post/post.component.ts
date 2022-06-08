import { Component, EventEmitter, Input, Output } from "@angular/core";
import { take } from "rxjs";
import Post from "src/app/models/post";
import PostService from "src/app/services/post.service";
import IPost from "../../models/post.interface";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"],
})
export default class PostComponent {
  @Input() ngValue: IPost = new Post();

  @Output() ngValueChange = new EventEmitter<IPost>();

  editMode = false;

  constructor(private postService: PostService) {}

  onPostEdited(event: IPost | null): void {
    if (event !== null && event.id) {
      this.postService
        .patch(event.id, event)
        .pipe(take(1))
        .subscribe((result: IPost) => {
          this.ngValue = result;
          this.ngValueChange.emit(result);
        });
    }

    this.editMode = false;
  }
}
