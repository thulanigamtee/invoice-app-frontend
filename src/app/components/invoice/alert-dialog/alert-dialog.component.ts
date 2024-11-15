import { Component, Input } from "@angular/core";
import { ButtonComponent } from "../../shared/button/button.component";
import { InvoiceService } from "../../../services/invoice.service";
import { DialogService } from "../../../services/dialog.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-alert-dialog",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./alert-dialog.component.html",
})
export class AlertDialogComponent {
  @Input() invoiceId: string = "";

  constructor(
    private invoiceService: InvoiceService,
    private dialogService: DialogService,
    private router: Router,
  ) {}

  dialogState(): boolean {
    return this.dialogService.getDialogState();
  }

  cancelDeletion() {
    this.dialogService.setDialogState(false);
  }
  confirmDeletion() {
    this.invoiceService.deleteInvoice(this.invoiceId).subscribe();
    this.dialogService.setDialogState(false);
    this.router.navigate(["/"]);
  }
}
