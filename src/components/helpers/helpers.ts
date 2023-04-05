import { urlPattern } from '../constants';

export function getRandomDigits() {
  return Math.random().toString().slice(2);
}

export const validateUrl = (url: string) => urlPattern.test(url);
