import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FixedHeightImage } from '../models';
import { GiphyService } from '../giphy.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display',
  standalone: false,
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit, OnDestroy {  
  //@Input()  
  images: FixedHeightImage[] = []

  private giphySvc = inject(GiphyService)

  private sub!: Subscription

  ngOnInit(): void {
    this.sub = this.giphySvc.searchResults.subscribe((images) => this.images = images)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
