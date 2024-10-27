import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-invoice-info",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./invoice-info.component.html",
})
export class InvoiceInfoComponent {
  @Input({ required: true }) invoice: any;
}
