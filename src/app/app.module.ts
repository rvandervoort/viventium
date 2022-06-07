import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// eslint-disable-next-line import/no-extraneous-dependencies
import { MatIconModule } from "@angular/material/icon";

import AppRoutingModule from "./app-routing.module";
import AppComponent from "./app.component";
import PostComponent from "./post/post.component";
import PostService from "./services/post.service";

@NgModule({
  declarations: [AppComponent, PostComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MatIconModule],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export default class AppModule {}
