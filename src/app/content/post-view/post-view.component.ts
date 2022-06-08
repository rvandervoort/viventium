import { Component, Input, } from '@angular/core';
import IPost from 'src/app/models/post.interface';
import Post from 'src/app/models/post';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export default class PostViewComponent {
  @Input() ngValue: IPost = new Post();
}
