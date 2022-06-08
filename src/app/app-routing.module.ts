import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import PostListComponent from "./content/post-list/post-list.component";
import PostResolver from "./resolvers/post.resolver";

const routes: Routes = [
  { path: "", redirectTo: "/posts", pathMatch: "full" },
  {
    path: "posts",
    component: PostListComponent,
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
