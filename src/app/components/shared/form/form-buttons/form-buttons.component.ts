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

  emitSubmitEvent(): void {
    this.submitEvent.emit();
  }

  emitSaveChangesEvent(): void {
    this.saveChangesEvent.emit();
  }

  emitSaveAsDraftEvent(): void {
    this.saveAsDraftEvent.emit();
  }

  constructor(private formService: FormService) {}

  isEditMode(): boolean {
    return this.formService.isEditMode;
  }

  discardForm(): void {
    this.formService.formState = false;
    document.body.classList.remove("no-scroll");
  }
}
