import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { InputComponent } from "../input/input.component";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ButtonComponent } from "../../button/button.component";

@Component({
  selector: "app-items",
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: "./items.component.html",
})
export class ItemsComponent implements OnInit {
  @Input() items!: any;
  @Output() totalUpdated = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    if (!this.items) this.items = this.formBuilder.array([]);
  }

  addItem() {
    const item: FormGroup = this.formBuilder.group({
      name: ["", Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, Validators.required],
      total: [0],
    });
    this.items.push(item);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.updateTotal();
  }

  updateTotal() {
    const total = this.items.controls.reduce((acc: any, item: any) => {
      const quantity = item.get("quantity")?.value || 0;
      const price = item.get("price")?.value || 0;
      const itemTotal = quantity * price;
      item.get("total")?.setValue(itemTotal, { emitEvent: false });
      return acc + itemTotal;
    }, 0);
    this.totalUpdated.emit(total);
  }
}
