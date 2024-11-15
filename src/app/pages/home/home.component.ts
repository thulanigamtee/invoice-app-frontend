import { Component, OnInit, ViewChild } from "@angular/core";
import { DropDownComponent } from "../../components/home/drop-down/drop-down.component";
import { ButtonComponent } from "../../components/shared/button/button.component";
import { InvoiceItemComponent } from "../../components/home/invoice-item/invoice-item.component";
import { FormComponent } from "../../components/shared/form/form.component";
import { FormService } from "../../services/form.service";
import { BreakpointObserverService } from "../../services/breakpointObserver.service";

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
export class HomeComponent implements OnInit {
  invoicesCount: number = 0;

  constructor(
    private breakpointObserver: BreakpointObserverService,
    private formService: FormService,
  ) {}

  ngOnInit() {
    this.observeBreakpoint();
  }

  isMediumWidth() {
    return this.breakpointObserver.isMediumWidth.value;
  }

  observeBreakpoint() {
    this.breakpointObserver.observeBreakpoint();
  }

  formState(): boolean {
    return this.formService.getFormState();
  }

  showForm() {
    this.formService.setFormState(true);
    this.formService.setIsEditMode(false);
    document.body.classList.add("no-scroll");
  }

  @ViewChild(InvoiceItemComponent) invoiceItem!: InvoiceItemComponent;
  filterByStatus(status: string) {
    this.invoiceItem.filterByStatus(status);
  }
}
