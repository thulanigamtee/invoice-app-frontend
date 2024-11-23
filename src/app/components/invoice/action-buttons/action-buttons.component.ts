import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonComponent } from "../../shared/button/button.component";
import { DialogService } from "../../../services/dialog.service";

@Component({
  selector: "app-action-buttons",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./action-buttons.component.html",
})
export class ActionButtonsComponent {
  @Input() isPending: boolean = false; // is invoice status === pending
  @Input() invoiceId!: string;
  @Output() editInvoiceEvent = new EventEmitter();
  @Output() markAsPaidEvent = new EventEmitter();

  emitEditInvoiceEvent() {
    this.editInvoiceEvent.emit();
  }

  emitMarkAsPaidEvent() {
    this.markAsPaidEvent.emit();
  }

  constructor(private dialogService: DialogService) {}

  deleteInvoice() {
    this.dialogService.dialogState = true;
  }
}
