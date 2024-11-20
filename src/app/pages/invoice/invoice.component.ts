import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { InvoiceInfoComponent } from "../../components/invoice/invoice-info/invoice-info.component";
import { StatusIndicatorComponent } from "../../components/shared/status-indicator/status-indicator.component";
import { ActionButtonsComponent } from "../../components/shared/action-buttons/action-buttons.component";
import { Invoice } from "../../interfaces/invoice.interface";
import { AlertDialogComponent } from "../../components/invoice/alert-dialog/alert-dialog.component";
import { InvoiceService } from "../../services/invoice.service";
import { FormComponent } from "../../components/shared/form/form.component";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-invoice",
  standalone: true,
  imports: [
    CommonModule,
    InvoiceInfoComponent,
    StatusIndicatorComponent,
    ActionButtonsComponent,
    AlertDialogComponent,
    FormComponent,
  ],
  templateUrl: "./invoice.component.html",
})
export class InvoiceComponent implements OnInit, OnDestroy {
  invoiceId!: string;
  invoice!: Invoice;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
  ) {}

  ngOnInit() {
    this.activatedRoute();
    this.getInvoice();
  }

  activatedRoute() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.invoiceId = this.route.snapshot.params["id"];
    });
  }

  getInvoice() {
    this.invoiceService
      .getInvoiceById(this.invoiceId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((invoice) => {
        this.invoice = invoice;
      });
  }

  @ViewChild(FormComponent) formComponent!: FormComponent;
  loadInvoice() {
    this.formComponent.loadInvoice(this.invoiceId);
  }

  markAsPaid(): void {
    if (this.invoice) {
      this.invoice.status = "paid";
      this.invoiceService
        .updateInvoice(this.invoiceId, this.invoice)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          error: () => {
            this.invoice.status = "pending"; // revert back if error occurs
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
