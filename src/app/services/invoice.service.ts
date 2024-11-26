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

  private statusCount = new BehaviorSubject<number>(0);
  statusCount$ = this.statusCount.asObservable();

  private _isFiltered = new BehaviorSubject<boolean>(false);
  isFiltered$ = this._isFiltered.asObservable();

  private _filterMessage = new BehaviorSubject<string>("");
  filterMessage$ = this._filterMessage.asObservable();

  private _isLoading = new BehaviorSubject<boolean>(true);
  isLoading$ = this._isLoading.asObservable();

  constructor(private http: HttpClient) {}

  getInvoices(status?: "draft" | "pending" | "paid"): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}`).pipe(
      tap((data) => {
        this.invoicesCount.next(data.length);
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

  get isFiltered() {
    return this._isFiltered.value;
  }

  set isFiltered(value: boolean) {
    this._isFiltered.next(value);
  }

  get filterMessage() {
    return this._filterMessage.value;
  }

  set filterMessage(message: string) {
    this._filterMessage.next(message);
  }

  get isLoading() {
    return this._isLoading.value;
  }

  set isLoading(isLoading: boolean) {
    this._isLoading.next(isLoading);
  }
}
