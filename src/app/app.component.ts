import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./components/shared/sidebar/sidebar.component";
import { fadeIn } from "./animations/route-animation";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: "./app.component.html",
  animations: [fadeIn]
})
export class AppComponent {
  getRouteAnimationData(outlet: RouterOutlet) {
    // return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    return outlet && outlet.activatedRouteData;
  }
}
