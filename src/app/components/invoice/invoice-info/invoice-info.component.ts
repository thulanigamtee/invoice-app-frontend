import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { Invoice } from "../../../interfaces/invoice.interface";

@Component({
  selector: "app-invoice-info",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./invoice-info.component.html",
})
export class InvoiceInfoComponent {
  @Input() invoice!: Invoice;
}
