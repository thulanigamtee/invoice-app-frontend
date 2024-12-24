import { Component, Input } from "@angular/core";
import { Invoice } from "../../../interfaces/invoice.interface";
import { CurrencyPipe, DatePipe } from "@angular/common";

@Component({
  selector: "app-invoice-info",
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: "./invoice-info.component.html",
})
export class InvoiceInfoComponent {
  @Input() invoice!: Invoice;
}
