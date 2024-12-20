import { Component } from "@angular/core";
import { ToastService } from "../../../services/toast.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-toast",
  standalone: true,
  imports: [],
  templateUrl: "./toast.component.html",
})
export class ToastComponent {
  toastState: boolean = false;
  message: string = "";
  private destroy$ = new Subject<void>();

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (state) => (this.toastState = state),
    });
    this.toastService.message$.pipe(takeUntil(this.destroy$)).subscribe({
      next: (message) => (this.message = message),
    });
  }
}
