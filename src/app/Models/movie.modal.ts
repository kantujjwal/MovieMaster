export interface Movie{
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
    posterurl: string[],
    stock: number,
    rate: number,
    currentStock: number
}

export interface CartItem{
    title: string,
    id: string,
    days: number,
    posterurl: string[],
    stock: number,
    rate: number
}