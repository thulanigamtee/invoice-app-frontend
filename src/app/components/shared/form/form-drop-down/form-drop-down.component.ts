import { Component } from "@angular/core";

@Component({
  selector: "app-form-drop-down",
  standalone: true,
  imports: [],
  templateUrl: "./form-drop-down.component.html",
})
export class FormDropDownComponent {
  isActive: boolean = false;
  toggleDropdown() {
    this.isActive = !this.isActive;
  }

  options: { id: number; value: string; isActive: boolean }[] = [
    { id: 0, value: "net 1 day", isActive: false },
    { id: 1, value: "net 7 days", isActive: false },
    { id: 2, value: "net 14 days", isActive: true },
    { id: 3, value: "net 30 days", isActive: true },
  ];
}
