import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ClientAddressComponent } from "./client-address/client-address.component";
import { SenderAddressComponent } from "./sender-address/sender-address.component";
import { ItemsComponent } from "./items/items.component";
import { InputComponent } from "./input/input.component";
import { FormService } from "../../../services/form.service";
import { InvoiceService } from "../../../services/invoice.service";
import { FormButtonsComponent } from "./form-buttons/form-buttons.component";
import { Invoice } from "../../../interfaces/invoice.interface";
import { Subject, takeUntil } from "rxjs";
import { FormDropDownComponent } from "./form-drop-down/form-drop-down.component";

@Component({
  selector: "app-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClientAddressComponent,
    SenderAddressComponent,
    ItemsComponent,
    InputComponent,
    FormButtonsComponent,
    FormDropDownComponent,
  ],
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit, OnDestroy {
  invoiceForm!: FormGroup;
  isEditMode!: boolean;
  formState!: boolean;
  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private invoiceService: InvoiceService,
  ) {}

  ngOnInit() {
    this.initialiseForm();
    this.formService.isEditMode$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (mode) => (this.isEditMode = mode),
    });
    this.formService.isActive$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (state) => (this.formState = state),
    });
    if (!this.isEditMode) {
      this.formService.paymentTerm$.pipe(takeUntil(this.destroy$)).subscribe({
        next: (term) => this.invoiceForm.get("paymentTerms")?.setValue(term),
      });
    }
    this.invoiceForm.get("status")?.setValue("pending");
  }

  initialiseForm() {
    this.invoiceForm = this.formBuilder.group({
      id: [""],
      createdAt: [new Date(), Validators.required],
      paymentDue: ["", Validators.required],
      description: ["", Validators.required],
      paymentTerms: [0, Validators.required],
      clientName: ["", Validators.required],
      clientEmail: ["", [Validators.required, Validators.email]],
      status: ["", Validators.required],
      clientAddress: this.formBuilder.group({
        street: ["", Validators.required],
        city: ["", Validators.required],
        postCode: ["", Validators.required],
        country: ["", Validators.required],
      }),
      senderAddress: this.formBuilder.group({
        street: ["", Validators.required],
        city: ["", Validators.required],
        postCode: ["", Validators.required],
        country: ["", Validators.required],
      }),
      items: this.formBuilder.array([], [Validators.required]),
      total: [0],
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get("items") as FormArray;
  }

  onTotalUpdated(newTotal: number) {
    this.invoiceForm.get("total")?.setValue(newTotal);
  }

  loadInvoice(id: string) {
    this.formService.isEditMode = true;
    this.formService.formState = true;
    document.body.classList.add("no-scroll");
    this.invoiceService
      .getInvoiceById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (invoice) => {
          this.invoiceForm.patchValue(invoice);
          this.formService.paymentTerm = invoice.paymentTerms;
          const itemsFormArray = this.invoiceForm.get("items") as FormArray;
          itemsFormArray.clear();
          this.loadInvoiceItems(invoice, itemsFormArray);
        },
      });
  }

  loadInvoiceItems(invoice: Invoice, itemsFormArray: FormArray) {
    invoice.items.forEach((item) => {
      itemsFormArray.push(
        this.formBuilder.group({
          name: [item.name, Validators.required],
          quantity: [item.quantity, [Validators.required, Validators.min(1)]],
          price: [item.price, [Validators.required, Validators.min(0)]],
          total: [item.total, Validators.required],
        }),
      );
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
