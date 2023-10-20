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

  const [errorImgUrl, setErrorImgUrl] = useState('');
  const [errorImdbUrl, setErrorImdbUrl] = useState('');

  function handleReset(event: React.FormEvent) {
    event.preventDefault();

    const newErrorImgUrl = !pattern.test(state.imgUrl) ? 'error' : '';
    const newErrorImdbUrl = !pattern.test(state.imdbUrl) ? 'error' : '';

    setErrorImgUrl(newErrorImgUrl);
    setErrorImdbUrl(newErrorImdbUrl);

    if (!newErrorImgUrl && !newErrorImdbUrl) {
      onAdd(state);
      setState({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      setCount((prev) => prev + 1);
    }
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
        errorImgUrl={errorImgUrl}
        onChange={value => setState({ ...state, imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={state.imdbUrl}
        errorImdbUrl={errorImdbUrl}
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
