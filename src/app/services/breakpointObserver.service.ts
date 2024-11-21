import { BreakpointObserver } from "@angular/cdk/layout";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BreakpointObserverService {
  private isMediumWidth = new BehaviorSubject<boolean>(false);
  isMediumWidth$ = this.isMediumWidth.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {}

  observeBreakpoint(): void {
    this.breakpointObserver
      .observe("(min-width: 768px)")
      .pipe(map((result) => result.matches))
      .subscribe((matches) => {
        this.isMediumWidth.next(matches);
      });
  }
}
