export const checkIsValidUrl = (regExp: RegExp, url: string): boolean => {
  return regExp.test(url);
};
