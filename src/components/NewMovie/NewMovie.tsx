/* eslint-disable padding-line-between-statements */
import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (value: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [state, setState] = useState({
    title: ''.trim(),
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const [hasImgUrl, setHasImgUrl] = useState('');
  const [hasImdbUrl, setHasImdbUrl] = useState('');

  function reset() {
    setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setHasImdbUrl('');
    setHasImgUrl('');
  }

  function handleReset(event: React.FormEvent) {
    event.preventDefault();

    if (!pattern.test(state.imgUrl) && !pattern.test(state.imdbUrl)) {
      setHasImgUrl('error');
      setHasImdbUrl('error');
      return;
    }

    if (!pattern.test(state.imgUrl)) {
      setHasImgUrl('error');
      return;
    }

    if (!pattern.test(state.imdbUrl)) {
      setHasImdbUrl('error');
      return;
    }

    onAdd(state);
    setCount((prev) => prev + 1);

    reset();
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
        hasImgUrl={hasImgUrl}
        onChange={value => {
          setState({ ...state, imgUrl: value });
          setHasImgUrl('');
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={state.imdbUrl}
        hasImdbUrl={hasImdbUrl}
        onChange={value => {
          setState({ ...state, imdbUrl: value });
          setHasImdbUrl('');
        }}
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
