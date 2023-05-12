/* eslint-disable implicit-arrow-linebreak */
import { ChangeEvent, FormEventHandler, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

const initialFormValues: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [count, setCount] = useState(0);

  const {
    title, description, imdbId, imdbUrl, imgUrl,
  } = formValues;

  const onChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setFormValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    onAdd(formValues);

    setFormValues(initialFormValues);
    setCount(prevState => prevState + 1);
  };

  const isDisabled = !title || !imdbId || !imdbUrl || !imgUrl;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        onChange={onChange}
        value={description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        onChange={onChange}
        value={imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        onChange={onChange}
        value={imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        onChange={onChange}
        value={imdbId}
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
