import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { InvoiceInfoComponent } from "../../components/invoice/invoice-info/invoice-info.component";
import { StatusIndicatorComponent } from "../../components/shared/status-indicator/status-indicator.component";
import { ButtonComponent } from "../../components/shared/button/button.component";
import { ActionButtonsComponent } from "../../components/shared/action-buttons/action-buttons.component";
import { Invoice } from "../../interfaces/invoice.interface";
import { AlertDialogComponent } from "../../components/invoice/alert-dialog/alert-dialog.component";
import { InvoiceService } from "../../services/invoice.service";

@Component({
  selector: "app-invoice",
  standalone: true,
  imports: [
    CommonModule,
    InvoiceInfoComponent,
    StatusIndicatorComponent,
    ButtonComponent,
    ActionButtonsComponent,
    AlertDialogComponent,
  ],
  templateUrl: "./invoice.component.html",
})
export class InvoiceComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private invoiceService: InvoiceService,
  ) {}

  invoiceId: string = "";
  invoices: Invoice[] = [];
  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
      this.invoiceId = this.activatedRoute.snapshot.params["id"];
    });
    this.getInvoice();
  }

  getInvoice() {
    this.invoiceService.getInvoices().subscribe((data) => {
      this.invoices = data.filter((invoice) => {
        return invoice.id === this.invoiceId;
      });
    });
  }
}
