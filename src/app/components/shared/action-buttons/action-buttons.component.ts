import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonComponent } from "../button/button.component";
import { DialogService } from "../../../services/dialog.service";
import { FormService } from "../../../services/form.service";

@Component({
  selector: "app-action-buttons",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./action-buttons.component.html",
})
export class ActionButtonsComponent {
  @Input() isPending: boolean = false; // is invoice status === pending
  @Input() invoiceId: string = "";
  @Output() editInvoice = new EventEmitter();

  emitEditInvoice() {
    this.editInvoice.emit();
  }

  constructor(
    private dialogService: DialogService,
    private formService: FormService,
  ) {}

  deleteInvoice() {
    this.dialogService.setDialogState(true);
  }

  // editInvoice() {
  //   this.formService.setFormState(true);
  //   this.formService.setFormMode(true);
  //   document.body.classList.add("no-scroll");
  // }
}
