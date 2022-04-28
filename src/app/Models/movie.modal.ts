import { AnyCatcher } from "rxjs/internal/AnyCatcher";

export interface Movie{
    // id: number,
    // name: string,
    // logo: string,
    // bannerImg: string,
    // releaseDate: Date,
    // tagLine: string,
    // description: string

    title: string,
    year: string,
    genres: string[],
    ratings: number[],
    id: string,
    contentRating: string,
    duration: string,
    releaseDate: string,
    averageRating: number,
    originalTitle: string,
    storyline: string,
    actors: string[],
    imdbRating: number,
    posterurl: string[]
}