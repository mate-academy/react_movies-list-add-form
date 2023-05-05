/// <reference types="react-scripts" />
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StringSchema } from 'yup';

declare module 'Yup' {
  interface StringSchema<T> {
    unique(
      message: string,
    ): StringSchema<T>;
    whitespace(
      message: string,
    ): StringSchema<T>;
  }
}
