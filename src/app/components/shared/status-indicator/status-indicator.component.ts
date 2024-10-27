import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-status-indicator",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./status-indicator.component.html",
})
export class StatusIndicatorComponent {
  @Input({ required: true }) status: string = "";
}
