import { urlPattern } from './regexp';

export function isUrl(str: string): boolean {
  return str.match(urlPattern) !== null;
}
