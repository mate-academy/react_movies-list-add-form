import { ChangeEvent, FormEvent, HTMLProps } from 'react';

export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
      [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
    }[Keys];

export type FormFieldErrors<T> = {
  [key in keyof T]?: boolean
};

export type ExtraProps = {
  name: keyof Movie;
  class: string;
  onChange: (e: ChangesEvent) => void;
};

export type HtmlPropsForMovieForm
  = (HTMLProps<HTMLTextAreaElement> & HTMLProps<HTMLInputElement>) | ExtraProps;

export type ChangesEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type SubmitEvent = FormEvent<HTMLFormElement>;
