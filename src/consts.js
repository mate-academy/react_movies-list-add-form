// eslint-disable-next-line max-len
export const URLRegExp = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/;

export const inputsFromServer = [
  'title',
  'description',
  'imgUrl',
  'imdbUrl',
  'imdbId',
];

export const initialInputs = inputsFromServer.reduce((acc, field) => {
  return {
    ...acc,
    [field]: '',
  };
}, {});

export const initialErrors = inputsFromServer.reduce((acc, error) => {
  return {
    ...acc,
    [error]: 'start',
  };
}, {});

export function doesContainsURL(inputName) {
  return /url/i.test(inputName);
}
