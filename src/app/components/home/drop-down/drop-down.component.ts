import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { OutsideClickDirective } from "../../../directives/outside-click.directive";
import { BreakpointObserver } from "@angular/cdk/layout";
import { map } from "rxjs";

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

  options: { id: number; value: string; checked: boolean }[] = [
    { id: 0, value: "draft", checked: false },
    { id: 1, value: "pending", checked: false },
    { id: 2, value: "paid", checked: true },
  ];

  updateStatus(id: number): void {
    this.options = this.options.map((option) => ({
      ...option,
      checked: option.id === id ? !option.checked : false,
    }));
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

  isMediumWidth: boolean = false;
  placeholder: string = "Filter";
  ngOnInit() {
    this.breakpointObserver
      .observe("(min-width: 768px)")
      .pipe(map((result) => result.matches))
      .subscribe((matches) => {
        this.isMediumWidth = matches;
        this.isMediumWidth
          ? (this.placeholder = "Filter by status")
          : (this.placeholder = "Filter");
      });
  }
}
