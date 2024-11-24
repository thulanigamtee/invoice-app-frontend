import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonComponent } from "../../button/button.component";
import { FormService } from "../../../../services/form.service";
import { FormGroup } from "@angular/forms";
import { InvoiceService } from "../../../../services/invoice.service";
import { Subject, takeUntil } from "rxjs";
import { ToastService } from "../../../../services/toast.service";

@Component({
  selector: "app-form-buttons",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./form-buttons.component.html",
})
export class FormButtonsComponent {
  @Input() form!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private formService: FormService,
    private invoiceService: InvoiceService,
    private toastService: ToastService,
  ) {}

  isEditMode() {
    return this.formService.isEditMode;
  }

  discardForm() {
    this.formService.formState = false;
    document.body.classList.remove("no-scroll");
  }

  createInvoice() {
    this.form.get("status")?.setValue("pending");
    this.invoiceService
      .createInvoice(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.formService.formState = false;
          document.body.classList.remove("no-scroll");
          setTimeout(() => {
            this.toastService.toastState = true;
          }, 500);
          this.toastService.message = "invoice successfully created";
          setTimeout(() => {
            this.toastService.toastState = false;
          }, 2000);
        },
        error: () => {
          this.toastService.message = "error creating invoice";
        },
      });
  }

  saveChanges() {
    const id = this.form.get("id")?.value;
    this.invoiceService
      .updateInvoice(id, this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.formService.formState = false;
          document.body.classList.remove("no-scroll");
          setTimeout(() => {
            this.toastService.toastState = true;
          }, 500);
          this.toastService.message = "invoice successfully updated";
          setTimeout(() => {
            this.toastService.toastState = false;
          }, 2000);
        },
        error: () => {
          this.toastService.message = "error updating invoice";
        },
      });
  }

  saveAsDraft() {
    this.form.get("status")?.setValue("draft");
    this.invoiceService
      .createInvoice(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.formService.formState = false;
          document.body.classList.remove("no-scroll");
          setTimeout(() => {
            this.toastService.toastState = true;
          }, 500);
          this.toastService.message = "draft successfully created";
          setTimeout(() => {
            this.toastService.toastState = false;
          }, 2000);
        },
        error: () => {
          this.toastService.message = "error creating invoice";
        },
      });
  }
}
