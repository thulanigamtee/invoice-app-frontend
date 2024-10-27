import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { InvoiceInfoComponent } from "../../components/invoice/invoice-info/invoice-info.component";
import { StatusIndicatorComponent } from "../../components/shared/status-indicator/status-indicator.component";
import { ButtonComponent } from "../../components/shared/button/button.component";
import { ActionButtonsComponent } from "../../components/shared/action-buttons/action-buttons.component";
import { InvoiceDataService } from "../../services/invoice-data.service";

@Component({
  selector: "app-invoice",
  standalone: true,
  imports: [
    CommonModule,
    InvoiceInfoComponent,
    StatusIndicatorComponent,
    ButtonComponent,
    ActionButtonsComponent,
  ],
  templateUrl: "./invoice.component.html",
})
export class InvoiceComponent {
  invoiceId: string = "";
  invoices: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private invoiceDataService: InvoiceDataService,
  ) {
    this.activatedRoute.params.subscribe(() => {
      this.invoiceId = this.activatedRoute.snapshot.params["id"];
    });
    this.invoiceDataService.getInvoices().subscribe((data) => {
      this.invoices = data.filter(
        (invoice: { id: string }) => invoice.id === this.invoiceId,
      );
    });
  }
}
