// eslint-disable-next-line max-len
// export const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const pattern = new RegExp(
  /(?:(?:(https?|ftp):)?\/\/)/.source
  + /(?:([^:\n\r]+):([^@\n\r]+)@)?/.source
  + /(?:(?:www.)?([^/\n\r]+))/.source
  + /(\/[^?\n\r]+)?/.source
  + /(\?[^#\n\r]*)?/.source
  + /(#?[^\n\r]*)?/.source,
);

export const initialMovieState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};
