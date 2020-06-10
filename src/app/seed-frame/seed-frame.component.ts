import { Renderer } from './renderer';
import { StatusFeedService } from './status-feed.service';
import { Hash } from './../model/types';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-seed-frame',
  templateUrl: './seed-frame.component.html',
  styleUrls: ['./seed-frame.component.scss']
})
export class SeedFrameComponent implements OnInit, OnDestroy {
  feed$: Observable<Hash>;
  subscription: Subscription;
  text: string;
  constructor(private statusFeed: StatusFeedService) { }

  ngOnInit(): void {
    this.feed$ = this.statusFeed.getWSObservvable();
    this.subscription = this.feed$.subscribe({
      next: msg => {
        console.log('info <SeedFrameComponent> message received: ' + JSON.stringify(msg));
        this.text = Renderer.render(msg);
      },
      error: err => console.error('error <SeedFrameComponent> error: ' + JSON.stringify(err)),
      complete: () => console.error('error <SeedFrameComponent> Observer got `complete` notification!')
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
