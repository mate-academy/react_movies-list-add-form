import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  handleMovieAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ handleMovieAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const validateUrl = (url: string) => {
    // eslint-disable-next-line max-len
    const pattern = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/);

    return pattern.test(url);
  };

  const isMovieValid = title.trim().length !== 0
    && validateUrl(imdbUrl)
    && validateUrl(imgUrl)
    && imdbId.trim().length !== 0;

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const submitNewMovie = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (isMovieValid) {
      const newFilm = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      handleMovieAdd(newFilm);
      setCount(prev => prev + 1);
      reset();
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitNewMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
        isValidateUrl={() => validateUrl(imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        isValidateUrl={() => validateUrl(imdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isMovieValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
