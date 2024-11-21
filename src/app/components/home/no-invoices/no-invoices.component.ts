import { Component, OnDestroy, OnInit } from "@angular/core";
import { BreakpointObserverService } from "../../../services/breakpointObserver.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-no-invoices",
  standalone: true,
  imports: [],
  templateUrl: "./no-invoices.component.html",
})
export class NoInvoicesComponent implements OnInit, OnDestroy {
  isMediumWidth!: boolean;
  private destroy$ = new Subject<void>();

  constructor(private breakpointObserverService: BreakpointObserverService) {}

  ngOnInit() {
    this.breakpointObserverService.observeBreakpoint();
    this.breakpointObserverService.isMediumWidth$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isMediumWidth) => {
        this.isMediumWidth = isMediumWidth;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
