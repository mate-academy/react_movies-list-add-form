export const urlsValidation = (url: string) => {
  return /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/.test(url);
};

export const simpleValidation = (inputValue: string) => {
  return inputValue.length > 0 && !/^\s+$/.test(inputValue);
};
