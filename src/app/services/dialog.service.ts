import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  private dialogSubject = new BehaviorSubject<boolean>(false);
  dialog$ = this.dialogSubject.asObservable();

  get dialogState() {
    return this.dialogSubject.value;
  }

  set dialogState(state: boolean) {
    this.dialogSubject.next(state);
  }
}
