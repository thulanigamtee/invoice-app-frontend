import { Component, Input, OnInit } from "@angular/core";
import { ButtonComponent } from "../../shared/button/button.component";
import { InvoiceService } from "../../../services/invoice.service";
import { DialogService } from "../../../services/dialog.service";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-alert-dialog",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./alert-dialog.component.html",
})
export class AlertDialogComponent implements OnInit {
  @Input() invoiceId!: string;
  dialogState!: boolean;
  private destroy$ = new Subject<void>();

  constructor(
    private invoiceService: InvoiceService,
    private dialogService: DialogService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.dialogService.isActive$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.dialogState = state;
      });
  }

  cancelDeletion(): void {
    this.dialogService.dialogState = false;
  }
  confirmDeletion(): void {
    this.invoiceService
      .deleteInvoice(this.invoiceId)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    console.log("dialog init");

    this.dialogService.dialogState = false;
    this.router.navigate(["/"]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
