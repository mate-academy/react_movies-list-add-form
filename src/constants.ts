/* eslint-disable max-len */

import { FieldType } from './types/typedefs';

export const PATTERN_URL = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
export const PATTERN_URL_IMAGE = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?).(jpg|jpeg|png|gif)$/;

// const pattern = /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
// this pattern is better, but one of the links in tests can't pass it

type FieldsState = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type FieldsValidationsState = {
  title: boolean;
  description: boolean;
  imgUrl: boolean;
  imdbUrl: boolean;
  imdbId: boolean;
};

export const fieldsInitialState: FieldsState = {
  [FieldType.TITLE]: '',
  [FieldType.DESCRIPTION]: '',
  [FieldType.IMAGEURL]: '',
  [FieldType.IMDBURL]: '',
  [FieldType.IMDBID]: '',
};

export const validationsInitialState: FieldsValidationsState = {
  [FieldType.TITLE]: false,
  [FieldType.DESCRIPTION]: true,
  [FieldType.IMAGEURL]: false,
  [FieldType.IMDBURL]: false,
  [FieldType.IMDBID]: false,
};
