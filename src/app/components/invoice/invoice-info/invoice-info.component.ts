import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AlertDialogComponent } from "../alert-dialog/alert-dialog.component";

@Component({
  selector: "app-invoice-info",
  standalone: true,
  imports: [CommonModule, AlertDialogComponent],
  templateUrl: "./invoice-info.component.html",
})
export class InvoiceInfoComponent {
  @Input({ required: true }) invoice: any;
}
