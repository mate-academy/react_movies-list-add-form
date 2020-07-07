export const PlaceholderHelper = (field) => {
  switch (field) {
    case 'imgUrl':
      return 'image url'.toUpperCase();
    case 'imdbUrl':
      return 'imdb url'.toUpperCase();
    case 'imdbId':
      return 'imdb id'.toUpperCase();
    default:
      return field.toUpperCase();
  }
};
