import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./components/shared/sidebar/sidebar.component";
import { fadeIn } from "./animations/route-animation";
import { ToastComponent } from "./components/shared/toast/toast.component";
import { OverlayService } from "./services/overlay.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ToastComponent],
  templateUrl: "./app.component.html",
  animations: [fadeIn],
})
export class AppComponent {
  isOverlayActive: boolean = false;
  private destroy$ = new Subject<void>();

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }

  constructor(private overlayService: OverlayService) {}

  ngOnInit() {
    this.overlayService.overlay$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => (this.isOverlayActive = state));
  }
}
