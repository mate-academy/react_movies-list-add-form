import React, { useState } from 'react';
import { TextField, pattern } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

type FillRequired = {
  title: boolean,
  imgUrl: boolean,
  imdbUrl: boolean,
  imdbId: boolean,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const defaultValues = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [textFieldsValue, setTextfieldsValue] = useState(defaultValues);

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = textFieldsValue;

  const fillRequired: FillRequired = {
    title: !!title.length,
    imgUrl: !!(pattern.test(imgUrl)),
    imdbUrl: !!(pattern.test(imdbUrl)),
    imdbId: !!imdbId.length,
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setTextfieldsValue(
      { ...textFieldsValue, [name]: value.trim().length > 0 ? value : '' },
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setTextfieldsValue(defaultValues);
    Object.values(fillRequired).forEach(el => !el);
    setCount(count + 1);
  };

  const disableSubmit = !Object.values(fillRequired).every(el => el === true);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChange}
        required
        validation
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChange}
        required
        validation
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disableSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
