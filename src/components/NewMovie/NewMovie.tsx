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

  const isDisabled = Object.entries(fields)
    .filter(field => field[0] !== 'description')
    .map(field => field[1])
    .some(field => field.trim().length === 0);

  const [count, IncreaseCount] = useState(0);

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={fields.title}
        onChange={(event) => handleChange(event, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={fields.description}
        onChange={(event) => handleChange(event, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={fields.imgUrl}
        onChange={(event) => handleChange(event, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={fields.imdbUrl}
        onChange={(event) => handleChange(event, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={fields.imdbId}
        onChange={(event) => handleChange(event, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={(event) => {
              event.preventDefault();

              setFields(defaultFields);

              onAdd(fields);

              IncreaseCount(count + 1);
            }}
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
