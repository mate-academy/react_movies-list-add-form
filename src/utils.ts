import { URL_REGEX } from "./const";

export function isValidUrl(string: string) {
  const regex = new RegExp(URL_REGEX);

  return regex.test(string);
}
