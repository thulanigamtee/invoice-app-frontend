import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-status-indicator",
  standalone: true,
  imports: [NgClass],
  templateUrl: "./status-indicator.component.html",
})
export class StatusIndicatorComponent {
  @Input({ required: true }) status: string = "";
}
