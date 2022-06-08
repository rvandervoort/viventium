import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// eslint-disable-next-line import/no-extraneous-dependencies
import { MatIconModule } from "@angular/material/icon";

import AppRoutingModule from "./app-routing.module";
import AppComponent from "./app.component";
import PostComponent from "./content/post/post.component";
import PostService from "./services/post.service";
import PostListComponent from "./content/post-list/post-list.component";
import SafeHtmlComponent from "./content/safe-html/safe-html.component";
import EditPostComponent from "./content/edit-html/edit-post.component";
import SanitizeHtmlPipe from "./pipes/sanitize-html.pipe";

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostListComponent,
    SafeHtmlComponent,
    EditPostComponent,
    SanitizeHtmlPipe,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatIconModule],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
