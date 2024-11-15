import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Invoice } from "../interfaces/invoice.interface";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  private apiUrl = "http://localhost:8080/invoices";

  private invoicesCount = new BehaviorSubject<number>(0);
  invoicesCount$ = this.invoicesCount.asObservable();

  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<any>(`${this.apiUrl}`).pipe(tap((data) => {
      this.invoicesCount.next(data.length)
    }));
  }

  createInvoice(newInvoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}`, newInvoice);
  }

  deleteInvoice(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }
}
