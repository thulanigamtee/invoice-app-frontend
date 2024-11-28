import { Component, Input } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormService } from "../../../../services/form.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./input.component.html",
})
export class InputComponent {
  @Input() label!: string;
  @Input() type: string = "text";
  @Input() id!: string;
  @Input() placeholder!: string;
  @Input() control!: any;
  @Input() readonly!: boolean;
}
