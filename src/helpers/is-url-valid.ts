import { URL_REGEXP } from '../constants/validation';

export const isUrlValid = (value: string) => value.match(URL_REGEXP);
