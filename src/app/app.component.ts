import { Component, inject } from '@angular/core';
import { FixedHeightImage, SearchCriteria } from './models';
import { GiphyService } from './giphy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  private giphySvc = inject(GiphyService)

  images!: FixedHeightImage[]

  whenQuerySearch($event: SearchCriteria) {
    console.info('>>> SearchCriteria: ', $event)

    this.giphySvc.getGiphyFixedHtImg($event).then(result => {
      console.info('>>> PROMISE result: ', result)

      this.images = result
    })
    .catch(err => { 
      console.info('>>> error: ', err) 
      alert(`ERROR: ${JSON.stringify(err)}`)
    })
  }
}
