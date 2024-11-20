import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private isActive = new BehaviorSubject<boolean>(false);
  private editMode = new BehaviorSubject<boolean>(false);

  get formState() {
    return this.isActive.value;
  }

  set formState(state: boolean) {
    this.isActive.next(state);
  }

  get isEditMode() {
    return this.editMode.value;
  }

  set isEditMode(mode: boolean) {
    this.editMode.next(mode);
  }
}
