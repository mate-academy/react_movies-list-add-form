import React, { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const initialState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movieState, setMovieState] = useState<Movie>(initialState);

  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isFormFilled = !movieState.title.trim()
    || !movieState.imgUrl.trim()
    || !movieState.imdbUrl.trim()
    || !movieState.imdbId.trim()
    || !pattern.test(movieState.imdbUrl)
    || !pattern.test(movieState.imgUrl);

  const addNewValue = (field: string, value: string) => {
    setMovieState(newMovie => ({
      ...newMovie,
      [field]: value,
    }));
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormFilled) {
      return;
    }

    onAdd(movieState);

    setMovieState(initialState);
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleAdd}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieState.title}
        onChange={(value) => addNewValue('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieState.description}
        onChange={(value) => addNewValue('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieState.imgUrl}
        onChange={(value) => addNewValue('imgUrl', value)}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieState.imdbUrl}
        onChange={(value) => addNewValue('imdbUrl', value)}
        pattern={pattern}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieState.imdbId}
        onChange={(value) => addNewValue('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFormFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
