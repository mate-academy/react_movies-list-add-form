/* eslint-disable */
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
/* eslint-enable */

export const validateField = (value:string, nameField:string) => {
  switch (nameField) {
    case 'imgUrl':
      return !value.match(pattern);
      break;
    case 'imdbUrl':
      return !value.match(pattern);
      break;
    default:
      return false;
      break;
  }
};
