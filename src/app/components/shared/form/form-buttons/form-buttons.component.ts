import { Component, Input } from "@angular/core";
import { ButtonComponent } from "../../button/button.component";
import { FormService } from "../../../../services/form.service";
import { FormGroup } from "@angular/forms";
import { InvoiceService } from "../../../../services/invoice.service";
import { Subject, takeUntil } from "rxjs";
import { ToastService } from "../../../../services/toast.service";
import { Invoice } from "../../../../interfaces/invoice.interface";

@Component({
  selector: "app-form-buttons",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./form-buttons.component.html",
})
export class FormButtonsComponent {
  @Input() form!: FormGroup;
  isLoading: boolean = true;
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
    if (this.form.valid) {
      this.invoiceService
        .createInvoice(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (newInvoice) => {
            this.updateInvoices(newInvoice);
            this.toastService.displayToastMessage(
              "Invoice successfully created",
            );
            this.form.reset();
          },
          error: () => {
            this.toastService.message = "Error creating invoice";
          },
        });
    }
  }

  updateInvoices(invoice: Invoice) {
    const updatedInvoices = [...this.invoiceService.invoices, invoice];
    this.invoiceService.invoices = updatedInvoices;
    this.invoiceService.invoicesCount = updatedInvoices.length;
    this.invoiceService.isFiltered = false;
    this.formService.formState = false;
    document.body.classList.remove("no-scroll");
  }

  saveChanges() {
    const id = this.form.get("id")?.value;
    this.invoiceService
      .updateInvoice(id, this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.invoiceService.invoice = data; // update invoice
          this.formService.formState = false;
          document.body.classList.remove("no-scroll");
          this.toastService.displayToastMessage("Invoice successfully updated");
        },
        error: () => {
          this.toastService.message = "Error updating invoice";
        },
      });
  }

  saveAsDraft() {
    this.form.get("status")?.setValue("draft");
    this.invoiceService
      .createInvoice(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (draftInvoice) => {
          this.updateInvoices(draftInvoice);
          this.toastService.displayToastMessage("Draft successfully created");
          this.form.reset();
        },
        error: () => {
          this.toastService.message = "Error creating invoice";
        },
      });
  }
}
