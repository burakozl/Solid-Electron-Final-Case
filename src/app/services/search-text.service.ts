import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTextService {

  constructor() { }

  private subject = new Subject<string>();

    sendData(message: string) {
        this.subject.next(message);
    }

    getData(): Observable<string> {
        return this.subject.asObservable();
    }
}
