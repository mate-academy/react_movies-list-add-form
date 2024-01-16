import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

const DEFAULT_NEW_MOVIE: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  // eslint-disable-next-line max-len
  const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const urlRegex = new RegExp(urlPattern);

  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>({ ...DEFAULT_NEW_MOVIE });

  const isUrlValid = (url: string) => urlRegex.test(url);

  const normalizedMovie: Movie = {
    title: newMovie.title.trim(),
    description: newMovie.description.trim(),
    imdbId: newMovie.imdbId.trim(),
    imgUrl: newMovie.imgUrl.trim(),
    imdbUrl: newMovie.imdbUrl.trim(),
  };
  const isImgUrlValid = normalizedMovie.imgUrl
    ? isUrlValid(normalizedMovie.imgUrl)
    : true;
  const isImdbUrlValid = normalizedMovie.imdbUrl
    ? isUrlValid(normalizedMovie.imdbUrl)
    : true;

  const isMovieValid = ({
    title,
    imdbId,
    imdbUrl,
    imgUrl,
  }: Movie) => title
  && imdbId
  && isImdbUrlValid
  && isImgUrlValid
  && imdbUrl
    && imgUrl;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(normalizedMovie);
    setNewMovie(DEFAULT_NEW_MOVIE);
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(newTitle) => setNewMovie({
          ...newMovie,
          title: newTitle,
        })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(newDescription) => setNewMovie({
          ...newMovie,
          description: newDescription,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(newImgUrl) => setNewMovie({
          ...newMovie,
          imgUrl: newImgUrl,
        })}
        errorMessage={isImgUrlValid ? null : 'Image URL is not valid'}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(newImdbUrl) => setNewMovie({
          ...newMovie,
          imdbUrl: newImdbUrl,
        })}
        errorMessage={isImdbUrlValid ? null : 'Imdb URL is not valid'}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(newImdbId) => setNewMovie({
          ...newMovie,
          imdbId: newImdbId,
        })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isMovieValid(normalizedMovie)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
