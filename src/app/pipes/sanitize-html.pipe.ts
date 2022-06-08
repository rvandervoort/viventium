import { Pipe, PipeTransform } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";
import * as sanitizeHtml from "sanitize-html";

@Pipe({
  name: "sanitizeHtml",
})
export default class SanitizeHtmlPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(value: string): SafeHtml {
    return sanitizeHtml(value);
  }
}
