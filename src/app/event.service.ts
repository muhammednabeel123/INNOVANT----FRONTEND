import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private submitEventSource = new Subject<void>();

  submitEvent$ = this.submitEventSource.asObservable();

  emitSubmitEvent() {
    this.submitEventSource.next();
  }
}