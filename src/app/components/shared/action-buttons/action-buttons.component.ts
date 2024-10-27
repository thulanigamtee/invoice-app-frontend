import { Component, Input } from "@angular/core";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: "app-action-buttons",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./action-buttons.component.html",
})
export class ActionButtonsComponent {
  @Input() isPending: boolean = false;
  @Input() invoiceId!: string;

  deleteInvoice() {
    console.log("gsgsggs");
  }
}
