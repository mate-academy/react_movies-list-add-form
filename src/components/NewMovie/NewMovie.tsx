import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { checkIsValidUrl } from '../../services/movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

interface State {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

const initialState: State = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState<State>(initialState);

  const hasInvalidFields = !state.title
    || !state.imgUrl
    || !state.imdbUrl
    || !state.imdbId;

  const resetForm = () => {
    setState(initialState);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isValidImgUrl = checkIsValidUrl(state.imgUrl);
    const isValidImdbUrl = checkIsValidUrl(state.imdbUrl);

    if (hasInvalidFields || !isValidImgUrl || !isValidImdbUrl) {
      return;
    }

    onAdd(state);

    resetForm();
    setCount(currentCount => currentCount + 1);
  };

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
        onChange={(newValue) => setState({
          ...state,
          title: newValue,
        })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={state.description}
        onChange={(newValue) => setState({
          ...state,
          description: newValue,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={state.imgUrl}
        onChange={(newValue) => setState({
          ...state,
          imgUrl: newValue,
        })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={state.imdbUrl}
        onChange={(newValue) => setState({
          ...state,
          imdbUrl: newValue,
        })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={state.imdbId}
        onChange={(newValue) => setState({
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
            disabled={hasInvalidFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
