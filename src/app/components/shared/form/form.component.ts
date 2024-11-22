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
import { Subject, takeUntil, timeout } from "rxjs";
import { ToastService } from "../../../services/toast.service";

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
  ],
  templateUrl: "./form.component.html",
})
export class FormComponent implements OnInit, OnDestroy {
  invoiceForm!: FormGroup;
  isEditMode!: boolean;
  formState!: boolean;
  private destroy$ = new Subject<void>();

  isActive: boolean = false;
  toggleDropdown() {
    this.isActive = !this.isActive;
  }

  options: { id: number; value: string; isActive: boolean }[] = [
    { id: 0, value: "net 1 day", isActive: false },
    { id: 1, value: "net 7 days", isActive: false },
    { id: 2, value: "net 14 days", isActive: true },
    { id: 3, value: "net 30 days", isActive: true },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private invoiceService: InvoiceService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    this.initialiseForm();
    this.formService.isEditMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe((mode) => {
        this.isEditMode = mode;
      });
    this.formService.isActive$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        this.formState = state;
      });
  }

  initialiseForm() {
    this.invoiceForm = this.formBuilder.group({
      id: [""],
      createdAt: ["", Validators.required],
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
      items: this.formBuilder.array([]),
      total: [],
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
      .subscribe((invoice) => {
        this.invoiceForm.patchValue(invoice);

        const itemsFormArray = this.invoiceForm.get("items") as FormArray;
        itemsFormArray.clear();
        this.loadInvoiceItems(invoice, itemsFormArray);
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

  submitForm() {
    if (this.isEditMode) {
      this.saveChanges();
    } else {
      this.invoiceService
        .createInvoice(this.invoiceForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.formService.formState = false;
            setTimeout(() => {
              this.toastService.toastState = true;
            }, 500);
            this.toastService.message = "invoice successfully created";
            setTimeout(() => {
              this.toastService.toastState = false;
            }, 2000);
          },
          error: () => {},
        });
    }
  }

  saveChanges() {
    const id = this.invoiceForm.get("id")?.value;
    this.invoiceService
      .updateInvoice(id, this.invoiceForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log("invoice updated");
        },
        error: () => {
          console.log("update failed");
        },
      });
  }

  saveAsDraft() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
