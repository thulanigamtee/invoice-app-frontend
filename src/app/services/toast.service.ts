import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  private toastSubject = new BehaviorSubject<boolean>(false);
  toast$ = this.toastSubject.asObservable();

  private messageSubject = new BehaviorSubject<string>("");
  message$ = this.messageSubject.asObservable();

  get toastState() {
    return this.toastSubject.value;
  }

  set toastState(state: boolean) {
    this.toastSubject.next(state);
  }

  get message() {
    return this.messageSubject.value;
  }

  set message(message: string) {
    this.messageSubject.next(message);
  }

  displayToastMessage(message: string) {
    setTimeout(() => {
      this.toastState = true;
    }, 500);
    this.message = message;
    setTimeout(() => {
      this.toastState = false;
    }, 2000);
  }
}
