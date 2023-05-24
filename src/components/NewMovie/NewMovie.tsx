import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { patternUrl } from '../../constants/constants';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, addCount] = useState(1);
  const [state, setState] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handlerStateFilm = (key: string, value: string) => {
    setState({ ...state, [key]: value });
  };

  const error = state.title.trim()
  && state.imdbId.trim()
  && patternUrl.test(state.imdbUrl.trim())
  && patternUrl.test(state.imgUrl.trim());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(state);
    addCount(prevState => prevState + count);
    setState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={state.title}
        onChange={handlerStateFilm}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={state.description}
        onChange={handlerStateFilm}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={state.imgUrl}
        onChange={handlerStateFilm}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={state.imdbUrl}
        onChange={handlerStateFilm}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={state.imdbId}
        onChange={handlerStateFilm}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!error}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
