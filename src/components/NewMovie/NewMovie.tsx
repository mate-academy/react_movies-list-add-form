import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

type State = {
  title: string,
  description: string,
  imgUrl: string,
  imdbUrl: string,
  imdbId: string,
};

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const defaultState: State = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [state, setState] = useState(defaultState);

  const hasEmptyFields = !state.title
    || state.title.trim() === ''
    || state.imgUrl.trim() === ''
    || state.imdbUrl.trim() === ''
    || state.imdbId.trim() === ''
    || !state.imgUrl
    || !state.imdbUrl
    || !state.imdbId
    || !pattern.test(state.imgUrl)
    || !pattern.test(state.imdbUrl);

  function resetAllFields() {
    setState(defaultState);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (hasEmptyFields) {
      return;
    }

    onAdd(state);
    resetAllFields();
    setCount(currCount => currCount + 1);
  }

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
        value={state.title}
        onChange={newValue => setState({
          ...state,
          title: newValue,
        })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={state.description}
        onChange={newValue => setState({
          ...state,
          description: newValue,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={state.imgUrl}
        onChange={newValue => setState({
          ...state,
          imgUrl: newValue,
        })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={state.imdbUrl}
        onChange={newValue => setState({
          ...state,
          imdbUrl: newValue,
        })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={state.imdbId}
        onChange={newValue => setState({
          ...state,
          imdbId: newValue,
        })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasEmptyFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
