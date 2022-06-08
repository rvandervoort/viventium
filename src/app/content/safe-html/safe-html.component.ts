import { Component, Input } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "app-safe-html",
  templateUrl: "./safe-html.component.html",
  styleUrls: ["./safe-html.component.scss"],
})
export default class SafeHtmlComponent {
  @Input() ngValue = "";
}
