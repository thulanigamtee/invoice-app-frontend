import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ClientAddressComponent } from "./client-address/client-address.component";
import { SenderAddressComponent } from "./sender-address/sender-address.component";
import { ItemsComponent } from "./items/items.component";
import { InputComponent } from "./input/input.component";
import { ButtonComponent } from "../button/button.component";
import { ActionButtonsComponent } from "../action-buttons/action-buttons.component";
import { OutsideClickDirective } from "../../../directives/outside-click.directive";
import { FormService } from "../../../services/form.service";

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
    ButtonComponent,
    ActionButtonsComponent,
    OutsideClickDirective,
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

  hideForm() {
    this.formService.setFormState(false);
  }

  formState(): boolean {
    return this.formService.getFormState();
  }

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
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
      items: this.formBuilder.array([
        this.formBuilder.group({
          name: ["", Validators.required],
          quantity: [1, [Validators.required, Validators.min(1)]],
          price: [0, [Validators.required, Validators.min(0)]],
          total: [0, Validators.required],
        }),
      ]),
      total: [0, Validators.required],
    });
  }
}
