import { Component, EventEmitter, Output } from "@angular/core";
import { ButtonComponent } from "../../button/button.component";
import { FormService } from "../../../../services/form.service";

@Component({
  selector: "app-form-buttons",
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: "./form-buttons.component.html",
})
export class FormButtonsComponent {
  @Output() submitEvent = new EventEmitter();

  emitSubmitEvent() {
    this.submitEvent.emit();
    console.log("sike");
  }

  constructor(private formService: FormService) {}

  discardForm() {
    this.formService.setFormState(false);
    document.body.classList.remove("no-scroll");
  }
}
