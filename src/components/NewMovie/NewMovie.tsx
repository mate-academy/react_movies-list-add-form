import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (value: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [state, setState] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const clearFormFields = () => {
    setState({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });

    setCount(prev => prev + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(state);

    clearFormFields();
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
        onChange={(value) => setState({ ...state, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={state.description}
        onChange={(value) => setState({ ...state, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={state.imgUrl}
        onChange={(value) => setState({ ...state, imgUrl: value })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={state.imdbUrl}
        onChange={(value) => setState({ ...state, imdbUrl: value })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={state.imdbId}
        onChange={(value) => setState({ ...state, imdbId: value })}
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
