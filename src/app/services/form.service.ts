import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private formSubject = new BehaviorSubject<boolean>(false);
  form$ = this.formSubject.asObservable();

  private isEditModeSubject = new BehaviorSubject<boolean>(false);
  isEditMode$ = this.isEditModeSubject.asObservable();

  private paymentTermSubject = new BehaviorSubject<number>(30);
  paymentTerm$ = this.paymentTermSubject.asObservable();

  get formState() {
    return this.formSubject.value;
  }

  set formState(state: boolean) {
    this.formSubject.next(state);
  }

  get isEditMode() {
    return this.isEditModeSubject.value;
  }

  set isEditMode(mode: boolean) {
    this.isEditModeSubject.next(mode);
  }

  get paymentTerm() {
    return this.paymentTermSubject.value;
  }

  set paymentTerm(term: number) {
    this.paymentTermSubject.next(term);
  }
}
