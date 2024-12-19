import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonComponent } from "../../shared/button/button.component";
import { DialogService } from "../../../services/dialog.service";
import { OverlayService } from "../../../services/overlay.service";

@Component({
  selector: "app-action-buttons",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./action-buttons.component.html",
})
export class ActionButtonsComponent {
  @Input() isInvoicePending: boolean = false;
  @Input() invoiceId!: string;
  @Output() editInvoiceEvent = new EventEmitter();
  @Output() markAsPaidEvent = new EventEmitter();

  emitEditInvoiceEvent() {
    this.editInvoiceEvent.emit();
  }

  emitMarkAsPaidEvent() {
    this.markAsPaidEvent.emit();
  }

  constructor(
    private dialogService: DialogService,
    private overlayService: OverlayService,
  ) {}

  deleteInvoice() {
    this.dialogService.dialogState = true;
    this.overlayService.overlayState = true;
  }
}
