import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "../../shared/button/button.component";
import { InvoiceService } from "../../../services/invoice.service";
import { DialogService } from "../../../services/dialog.service";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { ToastService } from "../../../services/toast.service";
import { OverlayService } from "../../../services/overlay.service";

@Component({
  selector: "app-alert-dialog",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./alert-dialog.component.html",
})
export class AlertDialogComponent implements OnInit, OnDestroy {
  @Input() invoiceId!: string;
  dialogState!: boolean;
  private destroy$ = new Subject<void>();

  constructor(
    private invoiceService: InvoiceService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private overlayService: OverlayService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.dialogService.dialog$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (state) => (this.dialogState = state),
    });
  }

  cancelDeletion() {
    this.dialogService.dialogState = false;
    this.overlayService.overlayState = false;
  }

  confirmDeletion() {
    this.invoiceService
      .deleteInvoice(this.invoiceId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.dialogService.dialogState = false;
          this.overlayService.overlayState = false;
          this.toastService.displayToastMessage("Invoice successfully deleted");
          this.router.navigate(["/"]);
        },
        error: () => {},
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
