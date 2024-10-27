import { Component, Input } from "@angular/core";
import { InputComponent } from "../input/input.component";
import {
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
export class ItemsComponent {
  @Input() items!: any;

  createItem(): FormGroup {
    return new FormGroup({
      name: new FormControl("", Validators.required),
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      total: new FormControl(0, Validators.required),
    });
  }
}
