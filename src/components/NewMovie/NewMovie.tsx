import React, { useState } from 'react';
// import { values } from 'cypress/types/lodash';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const formFields: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [newFilm, setNewFilm] = useState<Movie>(formFields);
  const checkButtonOnDisabled: boolean =
    !!newFilm.title.trim() &&
    !!newFilm.imgUrl.trim() &&
    !!newFilm.imdbUrl.trim() &&
    !!newFilm.imdbId.trim();
  const onSubmitForms = (e: React.FormEvent): void => {
    e.preventDefault;
    if (!checkButtonOnDisabled) {
      return;
    }
    onAdd(newFilm);
    setCount(count + 1);
    setNewFilm({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleInput = (key: string, value: string) => {
    setNewFilm(previousFilmFields => ({
      ...previousFilmFields,
      [key]: value,
    }));
  };

  return (
    <form onSubmit={onSubmitForms} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newFilm.title}
        onChange={value => handleInput('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newFilm.description}
        onChange={value => handleInput('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newFilm.imgUrl}
        onChange={value => handleInput('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newFilm.imdbUrl}
        onChange={value => handleInput('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newFilm.imdbId}
        onChange={value => handleInput('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!checkButtonOnDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
