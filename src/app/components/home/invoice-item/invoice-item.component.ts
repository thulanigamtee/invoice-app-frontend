import { Component } from "@angular/core";
import { Invoice } from "../../../interfaces/invoice.interface";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { StatusIndicatorComponent } from "../../shared/status-indicator/status-indicator.component";
import { InvoiceService } from "../../../services/invoice.service";

@Component({
  selector: "app-invoice-item",
  standalone: true,
  imports: [CommonModule, RouterLink, StatusIndicatorComponent],
  templateUrl: "./invoice-item.component.html",
})
export class InvoiceItemComponent {
  invoices: Invoice[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data;
    });
  }
}
