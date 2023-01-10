import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void,
};

export const NewMovie: React.FC<Props> = (props) => {
  const {
    onAdd,
  } = props;

  const defaultFields: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [fields, setFields] = useState(defaultFields);
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((currentCounter) => currentCounter + 1);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: keyof Movie,
  ) => {
    const newValue = event.currentTarget.value;

    setFields(currentFields => ({
      ...currentFields,
      [field]: newValue,
    }));
  };

  const handleAddingMovie = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    setFields(defaultFields);

    onAdd(fields);

    increaseCount();
  };

  const isDisabled = Object.entries(fields)
    .reduce((acc: string[], field) => {
      if (field[0] !== 'description') {
        return [...acc, field[1]];
      }

      return acc;
    }, [])
    .some(field => field.trim().length === 0);

  const {
    title,
    description,
    imgUrl,
    imdbId,
    imdbUrl,
  } = fields;

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => handleChange(event, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => handleChange(event, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => handleChange(event, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => handleChange(event, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => handleChange(event, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleAddingMovie}
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
