import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({ providedIn: "root" })
export class LoadingObserverService implements OnDestroy {

    isLoading = false;
    loaderSubject = new BehaviorSubject(false);

    loaderState = this.loaderSubject.asObservable();

    setState(state: boolean): void {
        this.loaderSubject.next(state);
    }

    ngOnDestroy(): void {
        this.loaderSubject.unsubscribe();
    }
}