import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { firstValueFrom, lastValueFrom, map, Subject, tap } from "rxjs";
import { FixedHeightImage, SearchCriteria, Response } from "./models";

@Injectable()
export class GiphyService {
    // RestTemplate
    private http = inject(HttpClient)

    private URL = 'https://api.giphy.com/v1/gifs/search'
    private API_KEY = 'vCUcePCWRjajYpnq4PAtiKtQ1OI6DgOi'

    // Share result to other components thru this service (thru Subscribe)
    searchResults = new Subject<FixedHeightImage[]>()

    getGiphyFixedHtImg(criteria: SearchCriteria): Promise<FixedHeightImage[]> {
        const params = new HttpParams()
                        .set('api_key', this.API_KEY)
                        .set('q', criteria.q.replace(' ', '+'))    // convert ' ' to '+'
                        .set('limit', criteria.limit)
                        .set('rating', criteria.rating);

        return firstValueFrom<FixedHeightImage[]>(this.http.get<any>(this.URL, { params: params })
            .pipe(
                tap(result => {
                    console.info('>>> TAP-0: ', result)
                }),
                
                // map result.data obj to result
                map(result => result['data']),
                tap(result => {
                    console.info('>>> TAP-1: ', result)
                }),
                
                // map each data's image.fixed_height to data (any[])
                map((data: any[]) => {
                    return data.map((g: any) => g.images.fixed_height)
                }),
                
                // Tap: Peek at data and use it w/o modifying it
                tap((result: FixedHeightImage[]) => {this.searchResults.next(result)})   
            )
        )

        // Alt to tap above
        // .then(result => {
        //     this.searchResults.next(result)
        //     return result
        // })
    }
}