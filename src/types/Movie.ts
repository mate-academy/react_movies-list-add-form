export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export enum MovieField {
  Title = 'title',
  Description = 'description',
  ImgUrl = 'imgUrl',
  ImdbUrl = 'imdbUrl',
  ImdbId = 'imdbId',
}
