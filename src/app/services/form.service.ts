import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FormService {
  private isActive = new BehaviorSubject<boolean>(false);
  isActive$ = this.isActive.asObservable();

  private _isEditMode = new BehaviorSubject<boolean>(false);
  isEditMode$ = this._isEditMode.asObservable();

  get formState() {
    return this.isActive.value;
  }

  set formState(state: boolean) {
    this.isActive.next(state);
  }

  get isEditMode() {
    return this._isEditMode.value;
  }

  set isEditMode(mode: boolean) {
    this._isEditMode.next(mode);
  }
}
