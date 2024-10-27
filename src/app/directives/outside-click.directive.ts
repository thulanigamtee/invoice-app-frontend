import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from "@angular/core";

@Directive({
  selector: "[OutsideClick]",
  standalone: true,
})
export class OutsideClickDirective {
  @Output() outsideClick = new EventEmitter();

  constructor(private ref: ElementRef) {}

  @HostListener("document: click", ["$event.target"])
  public onClick(target: any) {
    const isInsideClick = this.ref.nativeElement.contains(target);
    if (!isInsideClick) this.outsideClick.emit();
  }
}
