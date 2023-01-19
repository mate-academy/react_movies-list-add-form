export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export type InputEvent = React.ChangeEvent<HTMLInputElement>
| React.ChangeEvent<HTMLTextAreaElement>;

export type InputValues = {
  title: boolean,
  imdbId: boolean,
  imgUrl: boolean,
  imdbUrl: boolean,
};
