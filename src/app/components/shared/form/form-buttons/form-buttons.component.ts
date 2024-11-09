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
  @Output() changesEvent = new EventEmitter();
  @Output() draftEvent = new EventEmitter();
  emitSubmitEvent() {
    this.submitEvent.emit();
  }
  emitChangesEvent() {
    this.changesEvent.emit();
  }
  emitDraftEvent() {
    this.draftEvent.emit();
  }

  constructor(private formService: FormService) {}

  isEditMode(): boolean {
    return this.formService.getIsEditMode();
  }
  discardForm(): void {
    this.formService.setFormState(false);
    document.body.classList.remove("no-scroll");
  }
}
