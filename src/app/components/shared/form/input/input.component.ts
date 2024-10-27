import { Component, Input } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  ReactiveFormsModule,
  Validator,
} from "@angular/forms";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./input.component.html",
})
export class InputComponent implements ControlValueAccessor, Validator {
  @Input() label!: string;
  @Input() type: string = "text";
  @Input() id!: string;
  @Input() placeholder!: string;
  @Input() control!: any;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(c: FormControl) {
    return this.control.errors;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }
}
