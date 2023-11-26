import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: Movie) => void;
}

// eslint-disable-next-line max-len
const URL_VALIDATING_PATTERN = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd: addMovie }) => {
  const [count, setCount] = useState(0);
  const [formInputs, setFormInputs] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const reset = () => {
    setFormInputs({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setCount(count + 1);
    addMovie(formInputs);

    reset();
  };

  const checkIfUrlValid = (url: string) => {
    return URL_VALIDATING_PATTERN.test(url);
  };

  const isSubmittable
    = formInputs.title.trim() === ''
    || formInputs.imgUrl.trim() === ''
    || formInputs.imdbUrl.trim() === ''
    || formInputs.imdbId.trim() === ''
    || !checkIfUrlValid(formInputs.imgUrl)
    || !checkIfUrlValid(formInputs.imdbUrl);

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formInputs.title}
        onChange={value => setFormInputs({
          ...formInputs,
          title: value,
        })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formInputs.description}
        onChange={value => setFormInputs({
          ...formInputs,
          description: value,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formInputs.imgUrl}
        onChange={value => setFormInputs({
          ...formInputs,
          imgUrl: value,
        })}
        checkUrl={checkIfUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formInputs.imdbUrl}
        onChange={value => setFormInputs({
          ...formInputs,
          imdbUrl: value,
        })}
        checkUrl={checkIfUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formInputs.imdbId}
        onChange={value => setFormInputs({
          ...formInputs,
          imdbId: value,
        })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmittable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
