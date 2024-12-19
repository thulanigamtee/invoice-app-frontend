import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OverlayService {
  private overlaySubject = new BehaviorSubject(false);
  overlay$ = this.overlaySubject.asObservable();

  set overlayState(state: boolean) {
    this.overlaySubject.next(state);
  }

  get overlayState() {
    return this.overlaySubject.value;
  }
}
