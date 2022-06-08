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

  @Output() ngOnDelete = new EventEmitter<string>();

  @Input() allTags: Set<string> = new Set<string>();

  editMode = false;

  constructor(private postService: PostService) {}

  onPostEdited(event: Event | IPost | null): void {
    if (event !== null && (event as IPost).id) {
      this.postService
        .patch((event as IPost).id!, event as IPost)
        .pipe(take(1))
        .subscribe((result: IPost) => {
          this.ngValue = result;
          this.ngValueChange.emit(result);
        });
    }

    this.editMode = false;
  }

  onDelete(): void {
      this.postService
        .delete(this.ngValue.id!)
        .pipe(take(1))
        .subscribe(() => {
          this.ngOnDelete.emit(this.ngValue.id!);
        });
  }
}
