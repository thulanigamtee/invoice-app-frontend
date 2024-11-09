import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private isActive = new BehaviorSubject<boolean>(false);
  private isEditMode = new BehaviorSubject<boolean>(false);
  getFormState(): boolean {
    return this.isActive.value;
  }

  setFormState(state: boolean): void {
    this.isActive.next(state);
  }

  getIsEditMode(): boolean {
    return this.isEditMode.value;
  }
  setIsEditMode(mode: boolean): void {
    this.isEditMode.next(mode);
  }
}
