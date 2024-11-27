import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormService } from "../../../../services/form.service";
import { Subject, takeUntil } from "rxjs";
import { OutsideClickDirective } from "../../../../directives/outside-click.directive";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-drop-down",
  standalone: true,
  imports: [OutsideClickDirective],
  templateUrl: "./form-drop-down.component.html",
})
export class FormDropDownComponent implements OnInit, OnDestroy {
  isActive: boolean = false;
  paymentTerm!: number;
  @Input() form!: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.formService.paymentTerm$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (term) => (this.paymentTerm = term),
    });
  }

  options: { id: number; value: number }[] = [
    { id: 0, value: 1 },
    { id: 1, value: 7 },
    { id: 2, value: 14 },
    { id: 3, value: 30 },
  ];

  setPaymentTerm(term: number) {
    this.formService.paymentTerm = term;
    this.setDueDate(term);
    this.toggleDropdown();
  }

  setDueDate(term: number) {
    const invoiceDate = new Date(this.form.get("createdAt")?.value);
    const paymentDue = new Date(invoiceDate);
    paymentDue.setDate(paymentDue.getDate() + term);
    this.form.get("paymentDue")?.setValue(paymentDue);
  }

  toggleDropdown() {
    this.isActive = !this.isActive;
  }

  outsideClick() {
    this.isActive = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
