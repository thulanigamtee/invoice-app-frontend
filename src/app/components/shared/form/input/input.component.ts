import { Component, Input } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./input.component.html",
})
export class InputComponent {
  @Input() label!: string;
  @Input() type: string = "text";
  @Input() id!: string;
  @Input() placeholder!: string;
  @Input() control!: any;
  @Input() readonly!: boolean;

  get isInvalid() {
    return this.control?.invalid && this.control?.touched;
  }
}
