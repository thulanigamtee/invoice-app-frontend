import { Component } from "@angular/core";
import { BreakpointObserverService } from "../../../services/breakpointObserver.service";

@Component({
  selector: "app-no-invoices",
  standalone: true,
  imports: [],
  templateUrl: "./no-invoices.component.html",
})
export class NoInvoicesComponent {
  constructor(private breakpointObserver: BreakpointObserverService) {}

  ngOnInit(): void {
    this.observeBreakpoint();
  }

  isMediumWidth(): boolean {
    return this.breakpointObserver.isMediumWidth.value;
  }

  observeBreakpoint(): void {
    this.breakpointObserver.observeBreakpoint();
  }
}
