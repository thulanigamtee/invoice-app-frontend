import { Component } from "@angular/core";
import { DropDownComponent } from "../../components/home/drop-down/drop-down.component";
import { ButtonComponent } from "../../components/shared/button/button.component";
import { BreakpointObserver } from "@angular/cdk/layout";
import { map } from "rxjs";
import { InvoiceItemComponent } from "../../components/home/invoice-item/invoice-item.component";
import { FormComponent } from "../../components/shared/form/form.component";
import { FormService } from "../../services/form.service";

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
export class HomeComponent {
  invoiceTotal: string = "7 invoices";
  btnText: string = "New";

  formState(): boolean {
    return this.formService.getFormState();
  }

  showForm() {
    this.formService.setFormState(true);
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private formService: FormService,
  ) {}

  isMediumWidth: boolean = false;
  ngOnInit() {
    this.breakpointObserver
      .observe("(min-width: 768px)")
      .pipe(map((result) => result.matches))
      .subscribe((matches) => {
        this.isMediumWidth = matches;
        if (this.isMediumWidth) {
          this.btnText = "New Invoice";
          this.invoiceTotal = "There are 7 total invoices";
        } else {
          this.btnText = "New";
          this.invoiceTotal = "7 invoices";
        }
      });
  }
}
