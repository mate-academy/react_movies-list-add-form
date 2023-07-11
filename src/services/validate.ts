import { PostUrls } from '../types/PostUrls';

/* eslint-disable-next-line */
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const urlValidate = (currentValue: string, currentName: string) => {
  return Object.values(PostUrls).includes(currentName as PostUrls)
    && !pattern.test(currentValue);
};
