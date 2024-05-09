import { IMovie } from '../types/Movie';

export const getFields = ({
  title,
  description,
  imgUrl,
  imdbId,
  imdbUrl,
}: IMovie) => {
  return [
    { name: 'title', label: 'Title', value: title, required: true },
    {
      name: 'description',
      label: 'Description',
      value: description,
      required: false,
    },
    { name: 'imgUrl', label: 'Image URL', value: imgUrl, required: true },
    { name: 'imdbUrl', label: 'Imdb URL', value: imdbUrl, required: true },
    { name: 'imdbId', label: 'Imdb ID', value: imdbId, required: true },
  ];
};
