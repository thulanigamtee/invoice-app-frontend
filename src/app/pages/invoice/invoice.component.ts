import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { InvoiceInfoComponent } from "../../components/invoice/invoice-info/invoice-info.component";
import { StatusIndicatorComponent } from "../../components/shared/status-indicator/status-indicator.component";
import { ActionButtonsComponent } from "../../components/invoice/action-buttons/action-buttons.component";
import { Invoice } from "../../interfaces/invoice.interface";
import { AlertDialogComponent } from "../../components/invoice/alert-dialog/alert-dialog.component";
import { InvoiceService } from "../../services/invoice.service";
import { FormComponent } from "../../components/shared/form/form.component";
import { Subject, takeUntil } from "rxjs";
import { ToastService } from "../../services/toast.service";
import { LoaderComponent } from "../../components/shared/loader/loader.component";
import { FormService } from "../../services/form.service";
import { OverlayService } from "../../services/overlay.service";

@Component({
  selector: "app-invoice",
  standalone: true,
  imports: [
    InvoiceInfoComponent,
    StatusIndicatorComponent,
    ActionButtonsComponent,
    AlertDialogComponent,
    FormComponent,
    LoaderComponent,
    RouterLink,
  ],
  templateUrl: "./invoice.component.html",
})
export class InvoiceComponent implements OnInit, OnDestroy {
  invoiceId!: string;
  invoice!: Invoice;
  isLoading: boolean = true;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private toastService: ToastService,
    private formService: FormService,
    private overlayService: OverlayService,
  ) {}

  ngOnInit() {
    this.activatedRoute();
    this.getInvoice();
    this.invoiceService.isFiltered = false;
    this.invoiceService.isLoading = true;
    this.invoiceService.isLoading$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (loading) => (this.isLoading = loading),
    });
    this.invoiceService.invoice$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (invoice) => (this.invoice = invoice),
    });
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
      .subscribe({
        next: (invoice) => {
          this.invoiceService.invoice = invoice;
          this.invoiceService.isLoading = false;
        },
      });
  }

  @ViewChild(FormComponent) formComponent!: FormComponent;
  loadInvoice() {
    this.formComponent.loadInvoice(this.invoiceId);
  }

  markAsPaid() {
    if (this.invoice) {
      this.invoice.status = "paid";
      this.invoiceService
        .updateInvoice(this.invoiceId, this.invoice)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toastService.displayToastMessage(
              "Status successfully updated",
            );
          },
          error: () => {
            this.invoice.status = "pending";
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.formService.formState = false;
  }
}
