import { Component, EventEmitter, Input, Output } from "@angular/core";
import Post from "src/app/models/post";
import IPost from "src/app/models/post.interface";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.scss"],
})
export default class EditPostComponent {
  post: Post = new Post();

  @Input() set ngValue(value: IPost) {
    this.post = new Post(value, true); // clone
  }

  @Output() ngValueChange = new EventEmitter<IPost | null>(); // null would indicate no changes

  @Input() allTags: Set<string> = new Set<string>();

  onToggleTag(event: Event): void {
    if (!event.target) {
      return;
    }

    const target = event.target as unknown as HTMLInputElement;

    this.post.addOrRemoveTag(target.id, target.checked ? "add" : "remove");
  }

  onNewTag(event: Event): void {
    if (!event.target) {
      return;
    }

    const target = event.target as unknown as HTMLInputElement;

    if (target.value && target.value.length > 0) {
      // make add it to allTags, if it doesnt exist yet
      if (!this.allTags.has(target.value)) {
        this.allTags.add(target.value);
      }

      // add it to post.tags, if it isnt included yet
      if (!this.post.tags.includes(target.value)) {
        this.post.addOrRemoveTag(target.value, "add");
      }
    }
  }

  onTitleInput(event: Event){
    if (!event.target) {
      return;
    }

    const target = event.target as unknown as HTMLInputElement;

    this.post.title = target.value
  }

  onTextInput(event: Event){
    if (!event.target) {
      return;
    }

    const target = event.target as unknown as HTMLInputElement;

    this.post.text = target.value
  }

  onSave(){
    this.ngValueChange.emit(this.post);
  }

  onCancel(){
    this.ngValueChange.emit(null);
  }
}
