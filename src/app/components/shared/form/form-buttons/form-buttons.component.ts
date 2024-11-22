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
  @Output() saveChangesEvent = new EventEmitter();
  @Output() saveAsDraftEvent = new EventEmitter();

  emitSubmitEvent() {
    this.submitEvent.emit();
  }

  emitSaveChangesEvent() {
    this.saveChangesEvent.emit();
  }

  emitSaveAsDraftEvent() {
    this.saveAsDraftEvent.emit();
  }

  constructor(private formService: FormService) {}

  isEditMode() {
    return this.formService.isEditMode;
  }

  discardForm() {
    this.formService.formState = false;
    document.body.classList.remove("no-scroll");
  }
}
