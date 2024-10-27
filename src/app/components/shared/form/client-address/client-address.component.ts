import { Component, Input } from "@angular/core";
import { InputComponent } from "../input/input.component";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-client-address",
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: "./client-address.component.html",
})
export class ClientAddressComponent {
  @Input() clientAddress!: any;
}
