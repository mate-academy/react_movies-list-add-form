export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export type RequiredFields = Omit<Movie, 'description'>;
export type RequiredFieldsEmptyState = Record<keyof RequiredFields, boolean>;
export type RequiredFieldsTouchedState = Record<keyof RequiredFields, boolean>;
// export type CustomValidatedFields = Pick<Movie, 'imgUrl' | 'imdbUrl'>;
