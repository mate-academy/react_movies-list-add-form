export const movie = [
  'title',
  'description',
  'imgUrl',
  'imdbUrl',
  'imdbId',
];

export const initialState = movie.reduce((acc, value) => {
  return {
    ...acc,
    [value]: '',
  };
}, {});
