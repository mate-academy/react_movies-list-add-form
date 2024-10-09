import React, { useReducer, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidMovie, URL_REGEX } from '../../types/formvalid';
import './NewMovie.scss';

const MOVIE_PROPERTIES = {
  TITLE: 'title',
  DESCRIPTION: 'description',
  IMG_URL: 'imgUrl',
  IMDB_URL: 'imdbUrl',
  IMDB_ID: 'imdbId',
} as const;

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

type State = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type Action =
  | { type: 'SET_FIELD'; field: keyof State; value: string }
  | { type: 'RESET' };

const initialState: State = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [count, setCount] = useState(0);

  const handleChange = (field: keyof State, value: string) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const movie: Movie = {
      title: state.title.trim(),
      description: state.description.trim(),
      imgUrl: state.imgUrl.trim(),
      imdbUrl: state.imdbUrl.trim(),
      imdbId: state.imdbId.trim(),
    };

    if (isValidMovie(movie)) {
      onAdd(movie);
      reset();
      setCount(prev => prev + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={state.title}
        onChange={value => handleChange(MOVIE_PROPERTIES.TITLE, value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={state.description}
        onChange={value => handleChange(MOVIE_PROPERTIES.DESCRIPTION, value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={state.imgUrl}
        onChange={value => handleChange(MOVIE_PROPERTIES.IMG_URL, value)}
        validate={value => URL_REGEX.test(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={state.imdbUrl}
        onChange={value => handleChange(MOVIE_PROPERTIES.IMDB_URL, value)}
        validate={value => URL_REGEX.test(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={state.imdbId}
        onChange={value => handleChange(MOVIE_PROPERTIES.IMDB_ID, value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidMovie(state)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
