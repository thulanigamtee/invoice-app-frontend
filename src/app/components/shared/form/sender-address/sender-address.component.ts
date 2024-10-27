import { Component, Input } from "@angular/core";
import { InputComponent } from "../input/input.component";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-sender-address",
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: "./sender-address.component.html",
})
export class SenderAddressComponent {
  @Input() senderAddress!: any;
}
