import { Component, Input } from "@angular/core";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [],
  templateUrl: "./button.component.html",
  // template: ` <button
  //   class="font-leagueSpartan mx-auto flex h-[48px] items-center justify-center gap-x-2 rounded-full px-2 text-white md:h-[48px]"
  // >
  //   <ng-content></ng-content>
  //   <p class="font-bold">{{ text }}</p>
  // </button>`,
})
export class ButtonComponent {
  @Input({ required: true }) text: string = "";
  @Input() isNewInvoiceBtn: boolean = false;
}
