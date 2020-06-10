import { Injectable } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';
import { retryWhen, tap, delay } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Hash } from '../model/types';

@Injectable({
  providedIn: 'root'
})
export class StatusFeedService {
  private wsSubj$: WebSocketSubject<Hash>;

  constructor() { }
  public getWSSubject() {
    if (!this.wsSubj$) {
      this.wsSubj$ = new WebSocketSubject<Hash>(environment.seedApi.url);
      console.log('info <StatusFeedService>: WS open ' + environment.seedApi.url);
    }
    return this.wsSubj$;
  }
  public getWSObservvable() {
    return this.getWSSubject().pipe(
      retryWhen(errors => errors.pipe(
        tap(err => console.error('error <StatusFeedService>: WS connection error')),
        delay(100)
      ))
    );
  }
}
