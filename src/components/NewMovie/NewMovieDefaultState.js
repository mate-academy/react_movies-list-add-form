export const NewMovieDefaultState = {
  title: {
    value: '',
    isValid: true,
    pattern: new RegExp(/.{3,}/, 'gi'),
  },
  description: {
    value: '',
    isValid: true,
    pattern: new RegExp(/.{0,}/, 'gi'),
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

export const NewMovieDefaultStateValidatedFalse = {
  title: {
    value: '',
    isValid: false,
    pattern: new RegExp(/.{3,}/, 'gi'),
  },
  description: {
    value: '',
    isValid: false,
    pattern: new RegExp(/.{0,}/, 'gi'),
  },
  imgUrl: {
    value: '',
    isValid: false,
    // eslint-disable-next-line max-len
    pattern: new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/, 'g'),
  },
  imdbUrl: {
    value: '',
    isValid: false,
    // eslint-disable-next-line max-len
    pattern: new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/, 'g'),
  },
  imdbId: {
    value: '',
    isValid: false,
    pattern: new RegExp(/(tt)[\d]*/, 'g'),
  },
};
