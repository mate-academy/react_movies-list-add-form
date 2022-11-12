export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export type InputEvent = React.ChangeEvent<HTMLInputElement>
| React.ChangeEvent<HTMLTextAreaElement>;

export type InputConditions = {
  title: boolean | null,
  imdbId: boolean | null,
  imgUrl: boolean | null,
  imdbUrl: boolean | null,
};
