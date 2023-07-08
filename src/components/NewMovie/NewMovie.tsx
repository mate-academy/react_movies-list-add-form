import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const bluePrint = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [state, setState] = useState(bluePrint);
  const buttonHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    setCount(prevState => (prevState + 1));
    onAdd(state);
    setState(bluePrint);
  };

  /* eslint-disable max-len */
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const formIsReady = (state.title) && (state.imdbUrl.match(pattern) !== null) && (state.imgUrl.match(pattern) !== null) && state.imdbId.length > 0;

  const textFieldHandler = (name: string, event: string) => {
    setState(prevState => ({
      ...prevState,
      [name]: event,
    }));
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={state.title}
        onChange={(event) => textFieldHandler('title', event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={state.description}
        onChange={(event) => textFieldHandler('description', event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={state.imgUrl}
        onChange={(event) => textFieldHandler('imgUrl', event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={state.imdbUrl}
        onChange={(event) => textFieldHandler('imdbUrl', event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={state.imdbId}
        onChange={(event) => textFieldHandler('imdbId', event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={(event) => buttonHandler(event)}
            disabled={!formIsReady}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
