export type ChangeEvent = React.ChangeEvent<HTMLInputElement>
| React.ChangeEvent<HTMLTextAreaElement>;
export type InputConditions = {
  title: boolean | null,
  imdbId: boolean | null,
  imgUrl: boolean | null,
  imdbUrl: boolean | null,
};
export type InputErrors = {
  title:string,
  imdbId:string,
  imgUrl:string,
  imdbUrl:string,
};
export type Keys = keyof InputConditions;
/* export type ErrorKeys = keyof InputErrors; */
