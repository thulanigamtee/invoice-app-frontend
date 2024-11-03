import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  private isActive = new BehaviorSubject<boolean>(false);

  getDialogState(): boolean {
    return this.isActive.value;
  }

  setDialogState(state: boolean): void {
    this.isActive.next(state);
  }
}
