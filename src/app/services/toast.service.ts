import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private isActive = new BehaviorSubject<boolean>(false);
  isActive$ = this.isActive.asObservable();

  private _message = new BehaviorSubject<string>("");
  message$ = this._message.asObservable();

  get toastState() {
    return this.isActive.value;
  }

  set toastState(state: boolean) {
    this.isActive.next(state);
  }

  get message() {
    return this._message.value;
  }

  set message(message: string) {
    this._message.next(message);
  }
}
