import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [],
  templateUrl: "./button.component.html",
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() customStyle!: string;
  @Output() buttonEvent = new EventEmitter();

  emitButtonEvent() {
    this.buttonEvent.emit();
  }
}
