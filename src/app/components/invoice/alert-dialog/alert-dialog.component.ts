import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ButtonComponent } from "../../shared/button/button.component";
import { InvoiceService } from "../../../services/invoice.service";
import { DialogService } from "../../../services/dialog.service";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { ToastService } from "../../../services/toast.service";

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
    private router: Router,
  ) {}

  ngOnInit() {
    this.dialogService.isActive$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.dialogState = state;
      });
  }

  cancelDeletion() {
    this.dialogService.dialogState = false;
  }

  confirmDeletion() {
    this.invoiceService
      .deleteInvoice(this.invoiceId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.dialogService.dialogState = false;
          setTimeout(() => {
            this.toastService.toastState = true;
          }, 500);
          this.toastService.message = "invoice successfully deleted";
          this.router.navigate(["/"]);
          setTimeout(() => {
            this.toastService.toastState = false;
          }, 2000);
        },
        error: () => {},
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
