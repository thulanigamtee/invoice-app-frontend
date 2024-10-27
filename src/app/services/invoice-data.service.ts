import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invoice } from "../interfaces/invoice.interface";

@Injectable({
  providedIn: "root",
})
export class InvoiceDataService {
  private apiUrl = "http://localhost:8080/invoices";

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  createInvoice(newInvoice: Invoice): Observable<Invoice> {
    return this.http.post<any>(`${this.apiUrl}`, newInvoice);
  }
}
