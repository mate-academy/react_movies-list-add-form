import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../../constants/LINK_REGEXP';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  // Object that tracks all the required fields to be completed
  const initialValidity = {
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  };

  // initial value for all the fields
  const initValue = '';

  // movie object to edit and eventually add to the database
  const newMovie: Movie = {
    title: initValue,
    description: initValue,
    imgUrl: initValue,
    imdbUrl: initValue,
    imdbId: initValue,
  };

  const [movie, setMovie] = useState(newMovie);

  const [validity, setValidity] = useState(initialValidity);

  // trigger to enable submit button
  const [submitDisabled, setSubmit] = useState(true);

  // function to manipulate validity object above
  const approveField = (title: string, newSet: boolean) => {
    setValidity({ ...validity, [title]: newSet });
  };

  // count quantity of completed fields in validity object
  const validCount
    = Object.values(validity)
      .reduce((a, item) => a + Number(item), 0);

  // setting submit button accordingly to quantity of completed fields
  useEffect(() => {
    const disabled = validCount !== Object.keys(validity).length;

    setSubmit(disabled);
  }, [validCount]);

  const editMovie = (title: string, value: string) => {
    setMovie({ ...movie, [title]: value });
  };

  const onSubmit = () => {
    setCount(count + 1);
    onAdd(movie);
    setMovie(newMovie);
    setValidity(initialValidity);
  };

  const validHref = (value: string) => pattern.test(value);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        initValue={initValue}
        approveField={approveField}
        editMovie={editMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        initValue={initValue}
        editMovie={editMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        initValue={initValue}
        approveField={approveField}
        editMovie={editMovie}
        validHref={validHref}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        initValue={initValue}
        approveField={approveField}
        editMovie={editMovie}
        validHref={validHref}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        initValue={initValue}
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
