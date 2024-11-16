import { Component } from "@angular/core";
import { Invoice } from "../../../interfaces/invoice.interface";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { StatusIndicatorComponent } from "../../shared/status-indicator/status-indicator.component";
import { InvoiceService } from "../../../services/invoice.service";
import { NoInvoicesComponent } from "../no-invoices/no-invoices.component";
import { LoaderComponent } from "../../shared/loader/loader.component";

@Component({
  selector: "app-invoice-item",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    StatusIndicatorComponent,
    NoInvoicesComponent,
    LoaderComponent,
  ],
  templateUrl: "./invoice-item.component.html",
})
export class InvoiceItemComponent {
  invoices: Invoice[] = [];
  invoicesCount: number = 0;
  isLoading: boolean = true;

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data;
      this.invoicesCount = data.length;
      this.isLoading = false;
    });
  }

  filteredInvoices: Invoice[] = [];
  statusCounts: { draft: number; pending: number; paid: number } = {
    draft: 0,
    pending: 0,
    paid: 0,
  };

  filterByStatus(event: {
    status: "draft" | "pending" | "paid";
    isChecked: boolean;
  }) {
    if (!event.isChecked) {
      this.invoiceService.getInvoices().subscribe((data) => {
        this.invoices = data.filter(
          (invoice) => invoice.status === event.status,
        );
      });
    } else {
      this.invoiceService.getInvoices().subscribe((data) => {
        this.invoices = data;
      });
    }
    this.statusCounts.draft = this.invoices.filter(
      (draft) => draft.status === "draft",
    ).length;
    this.statusCounts.pending = this.invoices.filter(
      (pending) => pending.status === "pending",
    ).length;
    this.statusCounts.paid = this.invoices.filter(
      (paid) => paid.status === "paid",
    ).length;
  }
}
