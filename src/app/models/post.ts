import IPost from "./post.interface";

export default class Post implements IPost {
  id: string | null = null;

  title = "";

  tags: string[] = [];

  text = "";

  constructor(post?: IPost, clone?: boolean) {
    if (post) {
      this.id = post.id;
      this.title = post.title;
      this.tags = clone ? [...post.tags] : post.tags;
      this.text = post.text;
    }
  }

  addOrRemoveTag(tag: string, operation: "add" | "remove"): void {
    switch (operation) {
      case "add":
        this.tags.push(tag);
        break;
      case "remove":
        this.tags = this.tags.filter((item: string) => item !== tag);
        break;
      default:
        throw new Error("only add or remove operations are allowed");
    }
  }
}
