import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { DropDownComponent } from "../../components/home/drop-down/drop-down.component";
import { ButtonComponent } from "../../components/shared/button/button.component";
import { InvoiceItemComponent } from "../../components/home/invoice-item/invoice-item.component";
import { FormComponent } from "../../components/shared/form/form.component";
import { FormService } from "../../services/form.service";
import { BreakpointObserverService } from "../../services/breakpointObserver.service";
import { InvoiceService } from "../../services/invoice.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    DropDownComponent,
    ButtonComponent,
    InvoiceItemComponent,
    FormComponent,
  ],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit, OnDestroy {
  invoicesCount: number = 0;
  statusCount: number = 0;
  isFiltered!: boolean;
  filterMessage!: string;
  isMediumWidth!: boolean;
  private destroy$ = new Subject<void>();

  constructor(
    private breakpointObserverService: BreakpointObserverService,
    private formService: FormService,
    private invoiceService: InvoiceService,
  ) {}

  ngOnInit() {
    this.breakpointObserverService.observeBreakpoint();
    this.breakpointObserverService.isMediumWidth$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (width) => (this.isMediumWidth = width),
      });
    this.invoiceInformation();
    this.filterInformation();
  }

  invoiceInformation() {
    this.invoiceService.invoicesCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (count) => (this.invoicesCount = count),
      });
    this.invoiceService.statusCount$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (count) => (this.statusCount = count),
    });
  }

  filterInformation() {
    this.invoiceService.filterMessage$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (message) => (this.filterMessage = message),
      });
    this.invoiceService.isFiltered$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (isFiltered) => (this.isFiltered = isFiltered),
    });
  }

  showForm() {
    this.formService.formState = true;
    this.formService.isEditMode = false;
    document.body.classList.add("no-scroll");
  }

  @ViewChild(InvoiceItemComponent) invoiceItem!: InvoiceItemComponent;
  filterByStatus(event: {
    status: "draft" | "pending" | "paid";
    isChecked: boolean;
  }) {
    this.invoiceItem.filterByStatus(event);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.formService.formState = false;
  }
}
