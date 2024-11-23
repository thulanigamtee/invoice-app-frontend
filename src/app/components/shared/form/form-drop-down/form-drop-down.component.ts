import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormService } from "../../../../services/form.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-form-drop-down",
  standalone: true,
  imports: [],
  templateUrl: "./form-drop-down.component.html",
})
export class FormDropDownComponent implements OnInit, OnDestroy {
  isActive: boolean = false;
  paymentTerm!: number;
  private destroy$ = new Subject<void>();

  constructor(private formService: FormService) {}

  options: { id: number; value: number }[] = [
    { id: 0, value: 1 },
    { id: 1, value: 7 },
    { id: 2, value: 14 },
    { id: 3, value: 30 },
  ];

  setPaymentTerm(term: number) {
    this.formService.paymentTerm = term;
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.isActive = !this.isActive;
  }

  ngOnInit() {
    this.formService.paymentTerm$
      .pipe(takeUntil(this.destroy$))
      .subscribe((term) => {
        this.paymentTerm = term;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
