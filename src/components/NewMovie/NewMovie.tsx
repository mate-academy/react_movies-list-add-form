import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import useValidation from '../../helpers/useValidation';
import {
  newMovie,
  initialValidity,
} from '../../constants/initial-values';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd: handleOnAdd }) => {
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState(newMovie);

  const [validity, setValidity] = useState(initialValidity);

  const [submitDisabled, setSubmit] = useState(true);

  const approveField = (title: string, newSet: boolean) => {
    setValidity(currentValidity => ({ ...currentValidity, [title]: newSet }));
  };

  useValidation(validity, setSubmit);

  const editMovie = (title: string, value: string) => {
    setMovie(currentMovie => ({ ...currentMovie, [title]: value }));
  };

  const handleOnSubmit = () => {
    setCount(count + 1);
    handleOnAdd(movie);
    setMovie(newMovie);
    setValidity(initialValidity);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleOnSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        approveField={approveField}
        editMovie={editMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        editMovie={editMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        approveField={approveField}
        editMovie={editMovie}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        approveField={approveField}
        editMovie={editMovie}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        approveField={approveField}
        editMovie={editMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
