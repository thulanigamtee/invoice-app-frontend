import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { OutsideClickDirective } from "../../../directives/outside-click.directive";
import { BreakpointObserverService } from "../../../services/breakpointObserver.service";
import { Subject, takeUntil } from "rxjs";
import { NgClass } from "@angular/common";

@Component({
  selector: "app-drop-down",
  standalone: true,
  imports: [NgClass, OutsideClickDirective],
  templateUrl: "./drop-down.component.html",
})
export class DropDownComponent implements OnInit, OnDestroy {
  @Output() dropdownEvent = new EventEmitter<boolean>();

  @Output() filterEvent = new EventEmitter<{
    status: "draft" | "pending" | "paid";
    isChecked: boolean;
  }>();

  isDropdownActive!: boolean;
  isMediumWidth!: boolean;
  private destroy$ = new Subject<void>();

  emitDropdownEvent() {
    this.dropdownEvent.emit(this.isDropdownActive);
  }

  emitFilterEvent(
    event: { status: "draft" | "pending" | "paid"; isChecked: boolean },
    id: number,
  ): void {
    this.filterEvent.emit(event);
    this.updateStatus(id);
  }

  toggleDropDown() {
    this.isDropdownActive = !this.isDropdownActive;
    this.emitDropdownEvent();
  }

  outsideClick() {
    this.isDropdownActive = false;
    this.emitDropdownEvent();
  }

  constructor(private breakpointObserverService: BreakpointObserverService) {}

  ngOnInit() {
    this.breakpointObserverService.observeBreakpoint();
    this.breakpointObserverService.isMediumWidth$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (isMediumWidth) => (this.isMediumWidth = isMediumWidth),
      });
  }

  options: {
    id: number;
    value: "draft" | "pending" | "paid";
    checked: boolean;
  }[] = [
    { id: 0, value: "draft", checked: false },
    { id: 1, value: "pending", checked: false },
    { id: 2, value: "paid", checked: false },
  ];

  updateStatus(id: number) {
    this.options = this.options.map((option) => ({
      ...option,
      checked: option.id === id ? !option.checked : false,
    }));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
