export const getValidUrl = (regExp: RegExp, url: string): boolean => {
  return regExp.test(url);
};
