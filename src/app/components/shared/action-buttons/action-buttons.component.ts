import { Component, Input } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { DialogService } from "../../../services/dialog.service";

@Component({
  selector: "app-action-buttons",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./action-buttons.component.html",
})
export class ActionButtonsComponent {
  @Input() isPending: boolean = false; // is invoice status === pending
  @Input() invoiceId: string = "";

  constructor(private dialogService: DialogService) {}

  deleteInvoice() {
    this.dialogService.setDialogState(true);
  }
}
