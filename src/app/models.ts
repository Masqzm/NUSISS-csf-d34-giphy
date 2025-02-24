export const RATING: string[] = [ 'G', 'PG', 'PG-13', 'R' ]

export interface SearchCriteria {
    q: string,
    limit: number,
    rating: string
}

export interface Response {
    data: object[],
    meta: object,
    pagination: object
}

export interface FixedHeightImage {
    height: string,
    width: string,
    size: string,
    url: string
    // mp4_size: string,
    // mp4: string,
    // webp_size: string,
    // webp: string
}