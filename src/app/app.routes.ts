import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { InvoiceComponent } from "./pages/invoice/invoice.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "invoice/:id", component: InvoiceComponent },
];
