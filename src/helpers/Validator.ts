const pattern
  // eslint-disable-next-line max-len
  = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const Validator = (value: string, name: string) => {
  if (value && (name === "imgUrl" || name === "imdbUrl")) {
    if (!value.match(pattern)) {
      return true;
    }
  }

  return false;
};
