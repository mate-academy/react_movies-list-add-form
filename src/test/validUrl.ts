export const isValidUrl = (value: string): boolean => {
  // eslint-disable-next-line max-len
  const pattern = new RegExp(
    '^('
      + '((([A-Za-z]{3,9}:(?:\\/\\/)?)'
      + '(?:[-;:&=+$,\\w]+@)?'
      + '[A-Za-z0-9.-]+)|'
      + '(?:www\\.|[-;:&=+$,\\w]+@)'
      + '[A-Za-z0-9.-]+)'
      + '((?:\\/[+~%\\/.\\w-_]*)?'
      + '\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?'
      + ')$',
  );

  return pattern.test(value);
};
