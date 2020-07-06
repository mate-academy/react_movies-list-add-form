export const NewMovieDefaultState = {
  title: {
    value: '',
    isValid: true,
    pattern: new RegExp(/\w{3,}/, 'g'),
  },
  description: {
    value: '',
    isValid: true,
    pattern: new RegExp(/\w+/, 'g'),
  },
  imgUrl: {
    value: '',
    isValid: true,
    // eslint-disable-next-line max-len
    pattern: new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/, 'g'),
  },
  imdbUrl: {
    value: '',
    isValid: true,
    // eslint-disable-next-line max-len
    pattern: new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/, 'g'),
  },
  imdbId: {
    value: '',
    isValid: true,
    pattern: new RegExp(/(tt)[\d]*/, 'g'),
  },
};
