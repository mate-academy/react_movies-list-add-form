const pattern = new RegExp(
  '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?' +
    '[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)' +
    '[A-Za-z0-9.-]+)((?:\\/[+~%/\\.\\w-_]*)?' +
    '\\??(?:[-+=&;%@,\\.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
);

export const isURLValid = (url: string) => {
  return pattern.test(url);
};
