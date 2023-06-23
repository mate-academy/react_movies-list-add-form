export const validateLink = (link: string) => {
  // eslint-disable-next-line max-len
  return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/.test(link);
};

export const validateString = (string: string) => {
  return /\S/.test(string);
};

export const validateImdbId = (id: string) => {
  return /[a-z]{2}[0-9]{7}/.test(id);
};
