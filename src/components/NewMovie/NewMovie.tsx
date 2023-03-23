import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleMovie = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMovie({ ...newMovie, [event.target.name]: event.target.value });
  };

  const clearNewMovie = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handlerSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovie);
    clearNewMovie();
    setCount((curent) => curent + 1);
  };

  const urlValidator = (url: string): boolean => {
    // eslint-disable-next-line
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;
  const invalidUrls = !urlValidator(imgUrl) || !urlValidator(imdbUrl);
  const isDisabled = !title || !imgUrl || !imdbUrl || !imdbId || invalidUrls;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event => handlerSubmit(event))}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleMovie}
        required
        onValidation={urlValidator}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleMovie}
        required
        onValidation={urlValidator}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
