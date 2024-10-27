import { Component, Input } from "@angular/core";
import { ButtonComponent } from "../../shared/button/button.component";

@Component({
  selector: "app-dialog",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./dialog.component.html",
})
export class DialogComponent {
  @Input() invoiceId!: string;
}
