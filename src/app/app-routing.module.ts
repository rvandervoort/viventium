import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import PostComponent from "./post/post.component";
import PostResolver from "./resolvers/post.resolver";

const routes: Routes = [
  { path: "", redirectTo: "/posts", pathMatch: "full" },
  {
    path: "posts",
    component: PostComponent,
    pathMatch: "full",
    runGuardsAndResolvers: "always",
    resolve: { posts: PostResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class AppRoutingModule {}
