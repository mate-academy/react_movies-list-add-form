import { useState } from 'react';
import { TextField } from '../TextField';

export const NewMovie = () => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);

  // const [fieldValue, setFieldValue] = useState('');

  // const handleBnpm 

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value=""
        onChange={() => {}}
        required
      />

      <TextField
        name="description"
        label="Description"
        onChange={() => {}}
        value=""
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value=""
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value=""
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value=""
        required
      />

      <div className="field is-grouped">
        <div className="control">
          { count === 0
          && (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled
            >
              Add
            </button>
          ) }
          {/* <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled
          >
            Add
          </button> */}
        </div>
      </div>
    </form>
  );
};
