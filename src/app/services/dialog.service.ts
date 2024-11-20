import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  private isActive = new BehaviorSubject<boolean>(false);

  get dialogState() {
    return this.isActive.value;
  }

  set dialogState(state: boolean) {
    this.isActive.next(state);
  }
}
