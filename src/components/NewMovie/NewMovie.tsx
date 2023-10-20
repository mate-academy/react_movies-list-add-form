import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (value: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [state, setState] = useState({
    title: ''.trim(),
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  function handleReset(event: React.FormEvent) {
    event.preventDefault();

    setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    onAdd(state);
    setCount((prev) => prev + 1);
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleReset}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={state.title}
        onChange={value => setState({ ...state, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={state.description}
        onChange={value => setState({ ...state, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={state.imgUrl}
        onChange={value => setState({ ...state, imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={state.imdbUrl}
        onChange={value => setState({ ...state, imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={state.imdbId}
        onChange={value => setState({ ...state, imdbId: value })}
        required

      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !state.title
              || !state.imgUrl
              || !state.imdbUrl
              || !state.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
