import { Component } from "@angular/core";
import { Invoice } from "../../../interfaces/invoice.interface";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { StatusIndicatorComponent } from "../../shared/status-indicator/status-indicator.component";
import { InvoiceService } from "../../../services/invoice.service";
import { NoInvoicesComponent } from "../no-invoices/no-invoices.component";
import { LoaderComponent } from "../../shared/loader/loader.component";
import { Subject, takeUntil } from "rxjs";

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
  private destroy$ = new Subject<void>();

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices(status?: "draft" | "pending" | "paid"): void {
    this.invoiceService
      .getInvoices(status)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.invoices = data;
        this.invoicesCount = data.length;
        this.isLoading = false;
      });
  }
  filterByStatus(event: {
    status: "draft" | "pending" | "paid";
    isChecked: boolean;
  }): void {
    if (!event.isChecked) {
      this.invoiceService
        .getInvoices(event.status)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.invoices = data.filter(
            (invoice) => invoice.status === event.status,
          );
        });
      this.invoiceService.isFiltered = true;
      this.invoiceService.filterMessage = event.status;
    } else {
      this.invoiceService
        .getInvoices()
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.invoices = data;
        });
      this.invoiceService.isFiltered = false;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
