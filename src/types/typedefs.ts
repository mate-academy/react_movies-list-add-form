export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export enum FieldType {
  TITLE = 'title',
  DESCRIPTION = 'description',
  IMAGEURL = 'imgUrl',
  IMDBURL = 'imdbUrl',
  IMDBID = 'imdbId',
}
