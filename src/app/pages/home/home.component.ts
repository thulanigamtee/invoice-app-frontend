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
  private destroy$ = new Subject<void>();

  constructor(
    private breakpointObserver: BreakpointObserverService,
    private formService: FormService,
    private invoiceService: InvoiceService,
  ) {}

  ngOnInit() {
    this.observeBreakpoint();
    this.invoiceService.invoicesCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe((count) => {
        this.invoicesCount = count;
      });
    this.invoiceService.statusCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe((count) => {
        this.statusCount = count;
      });
  }

  isMediumWidth(): boolean {
    return this.breakpointObserver.isMediumWidth.value;
  }

  observeBreakpoint(): void {
    this.breakpointObserver.observeBreakpoint();
  }

  formState(): boolean {
    return this.formService.formState;
  }

  showForm(): void {
    this.formService.formState = true;
    this.formService.isEditMode = false;
    document.body.classList.add("no-scroll");
  }

  @ViewChild(InvoiceItemComponent) invoiceItem!: InvoiceItemComponent;
  filterByStatus(event: {
    status: "draft" | "pending" | "paid";
    isChecked: boolean;
  }): void {
    this.invoiceItem.filterByStatus(event);
  }

  isFiltered(): boolean {
    return this.invoiceService.isFiltered;
  }

  filterMessage(): string {
    return this.invoiceService.filterMessage;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
