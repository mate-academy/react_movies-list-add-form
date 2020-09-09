export const names = ['title', 'description', 'imdbUrl', 'imdbId', 'imgUrl'];

export const initialState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
  titleError: '',
  descriptionError: '',
  imgUrlError: '',
  imdbUrlError: '',
  imdbIdError: '',
};

export const indexes = {
  title: 0,
  description: 1,
  imgUrl: 2,
  imdbUrl: 3,
  imdbId: 4,
};

export const status = [1, 1, 1, 1, 1];

// eslint-disable-next-line max-len
export const reg = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
