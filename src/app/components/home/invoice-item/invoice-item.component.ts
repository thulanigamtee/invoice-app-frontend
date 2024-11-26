import { Component, OnDestroy, OnInit } from "@angular/core";
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
export class InvoiceItemComponent implements OnInit, OnDestroy {
  invoices: Invoice[] = [];
  invoicesCount: number = 0;
  isLoading: boolean = true;
  private destroy$ = new Subject<void>();

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices(status?: "draft" | "pending" | "paid") {
    this.invoiceService
      .getInvoices(status)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.invoices = data;
        this.invoicesCount = data.length;
        this.invoiceService.isLoading = false;
      });
    this.invoiceService.isLoading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.isLoading = loading;
      });
  }
  filterByStatus(event: {
    status: "draft" | "pending" | "paid";
    isChecked: boolean;
  }) {
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
