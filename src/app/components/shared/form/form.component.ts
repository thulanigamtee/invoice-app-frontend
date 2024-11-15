import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
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
export class FormComponent {
  invoiceForm: FormGroup;

  isActive: boolean = false;
  toggleDropdown(): void {
    this.isActive = !this.isActive;
  }

  options: { id: number; value: string; isActive: boolean }[] = [
    { id: 0, value: "net 1 day", isActive: false },
    { id: 1, value: "net 7 days", isActive: false },
    { id: 2, value: "net 14 days", isActive: true },
    { id: 3, value: "net 30 days", isActive: true },
  ];

  formState(): boolean {
    return this.formService.getFormState();
  }

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private invoiceService: InvoiceService,
  ) {
    this.invoiceForm = this.formBuilder.group({
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

  isEditMode() {
    return this.formService.getIsEditMode();
  }
  get items(): FormArray {
    return this.invoiceForm.get("items") as FormArray;
  }
  onTotalUpdated(newTotal: number): void {
    this.invoiceForm.get("total")?.setValue(newTotal);
  }

  submitForm() {
    // if (this.invoiceForm.valid) {
    const invoice: Invoice = this.invoiceForm.value;
    this.invoiceService.createInvoice(invoice).subscribe((response) => {
      console.log("Invoice created:", response);
      this.invoiceForm.reset(); // Clear form after submission
    });
    // }
  }
  loadInvoice(id: string) {
    this.formService.setIsEditMode(true);
    this.formService.setFormState(true);
    this.invoiceService.getInvoiceById(id).subscribe((invoice) => {
      this.invoiceForm.patchValue(invoice);

      const itemsFormArray = this.invoiceForm.get("items") as FormArray;
      itemsFormArray.clear();

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
    });
  }
}
