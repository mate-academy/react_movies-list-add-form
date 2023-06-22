import { React, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const preparedForm: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movieForm, setMovieForm] = useState(preparedForm);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movieForm;

  const onChange = (key: string, value: string) => {
    setMovieForm((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const isFormEmpty = Object
      .values(movieForm)
      .every((value) => value.trim() === '');

    if (isFormEmpty) {
      return;
    }

    onAdd(movieForm);

    setCount((prevCount) => prevCount + 1);
    setMovieForm(preparedForm);
  };

  const requiredFieldsAdded = title.trim()
    && imdbId.trim()
    && imdbUrl.trim()
    && imgUrl.trim();

  return (
    <div className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => {
          onChange('title', value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => {
          onChange('description', value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => {
          onChange('imgUrl', value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          onChange('imdbUrl', value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => {
          onChange('imdbId', value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="button"
            data-cy="submit-button"
            className="button is-link"
            disabled={!requiredFieldsAdded}
            onClick={onSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
