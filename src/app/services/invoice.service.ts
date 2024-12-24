import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, of, tap } from "rxjs";
import { Invoice } from "../interfaces/invoice.interface";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  private apiUrl = "http://localhost:8080/invoices";

  private invoicesCountSubject = new BehaviorSubject<number>(0);
  invoicesCount$ = this.invoicesCountSubject.asObservable();

  private invoicesSubject = new BehaviorSubject<Invoice[]>([]);
  invoices$ = this.invoicesSubject.asObservable();

  private invoiceSubject = new BehaviorSubject<any>({});
  invoice$ = this.invoiceSubject.asObservable();

  private statusCount = new BehaviorSubject<number>(0);
  statusCount$ = this.statusCount.asObservable();

  private isFilteredSubject = new BehaviorSubject<boolean>(false);
  isFiltered$ = this.isFilteredSubject.asObservable();

  private filterMessageSubject = new BehaviorSubject<string>("");
  filterMessage$ = this.filterMessageSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(true);
  isLoading$ = this.isLoadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  getInvoices(status?: "draft" | "pending" | "paid"): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}`).pipe(
      tap((data) => {
        this.invoicesCountSubject.next(data.length);
        this.statusCount.next(
          data.filter((invoice) => invoice.status === status).length,
        );
      }),
    );
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

  updateInvoice(id: string, updatedInvoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${this.apiUrl}/${id}`, updatedInvoice);
  }

  get invoicesCount() {
    return this.invoicesCountSubject.value;
  }

  set invoicesCount(count) {
    this.invoicesCountSubject.next(count);
  }

  get invoices() {
    return this.invoicesSubject.value;
  }

  set invoices(invoice) {
    this.invoicesSubject.next(invoice);
  }

  get invoice() {
    return this.invoiceSubject.value;
  }

  set invoice(invoice) {
    this.invoiceSubject.next(invoice);
  }

  get isFiltered() {
    return this.isFilteredSubject.value;
  }

  set isFiltered(value: boolean) {
    this.isFilteredSubject.next(value);
  }

  get filterMessage() {
    return this.filterMessageSubject.value;
  }

  set filterMessage(message: string) {
    this.filterMessageSubject.next(message);
  }

  get isLoading() {
    return this.isLoadingSubject.value;
  }

  set isLoading(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }
}
