export type Rows = 'title' | 'description' | 'imgUrl' | 'imdbUrl' | 'imdbId';

export interface Movie {
  title: string;
  description?: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}
