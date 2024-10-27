import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SidebarComponent } from "./components/shared/sidebar/sidebar.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: "./app.component.html",
})
export class AppComponent {}
