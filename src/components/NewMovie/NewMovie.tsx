import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

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

  const handler = (name: string, value: string) => {
    setNewMovie(prevMovie => ({
      ...prevMovie,
      [name]: value.trim(),
    }));
  };

  const clearForm = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const checkingFields = () => {
    return Object.keys(newMovie).filter(key => key !== 'description')
      .map(key => newMovie[key as keyof Movie])
      .filter(value => value.length).length < 4;
  };

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!checkingFields()) {
      onAdd(newMovie);
      clearForm();
    }

    setCount(prevCount => prevCount + 1);
  };

  const validationURL = (url: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handler}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handler}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handler}
        checkURL={validationURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handler}
        checkURL={validationURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handler}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkingFields()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
