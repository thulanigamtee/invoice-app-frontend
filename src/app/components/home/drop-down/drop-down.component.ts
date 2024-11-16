import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { OutsideClickDirective } from "../../../directives/outside-click.directive";
import { BreakpointObserverService } from "../../../services/breakpointObserver.service";

@Component({
  selector: "app-drop-down",
  standalone: true,
  imports: [CommonModule, OutsideClickDirective],
  templateUrl: "./drop-down.component.html",
})
export class DropDownComponent {
  @Output() isActiveEvent = new EventEmitter<boolean>();
  isActive: boolean = false;

  emitIsActiveEvent() {
    this.isActiveEvent.emit(this.isActive);
  }

  toggleDropDown() {
    this.isActive = !this.isActive;
    this.emitIsActiveEvent();
  }

  outsideClick() {
    this.isActive = false;
    this.emitIsActiveEvent();
  }

  constructor(private breakpointObserver: BreakpointObserverService) {}

  options: {
    id: number;
    value: "draft" | "pending" | "paid";
    checked: boolean;
  }[] = [
    { id: 0, value: "draft", checked: false },
    { id: 1, value: "pending", checked: false },
    { id: 2, value: "paid", checked: false },
  ];

  updateStatus(id: number): void {
    this.options = this.options.map((option) => ({
      ...option,
      checked: option.id === id ? !option.checked : false,
    }));
  }

  @Output() filterEvent = new EventEmitter<{
    status: "draft" | "pending" | "paid";
    isChecked: boolean;
  }>();

  emitFilterEvent(
    event: { status: "draft" | "pending" | "paid"; isChecked: boolean },
    id: number,
  ) {
    this.filterEvent.emit(event);
    this.updateStatus(id);
  }

  ngOnInit() {
    this.observeBreakpoint();
  }

  isMediumWidth() {
    return this.breakpointObserver.isMediumWidth.value;
  }

  observeBreakpoint() {
    this.breakpointObserver.observeBreakpoint();
  }
}
