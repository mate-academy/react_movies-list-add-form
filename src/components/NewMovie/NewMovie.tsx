import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newValue: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [isVeryfied, setIsVeryfied] = useState(false);

  const changeMovieField = (field: string, newValue: string) => {
    setNewMovie(movie => ({
      ...movie,
      [field]: newValue,
    }));
  };

  const customValidation = (value: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    const result = pattern.test(value);

    return result;
  };

  const setVeryfication = (value: boolean) => {
    setIsVeryfied(value);
  };

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={changeMovieField}
        veryfied={setVeryfication}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={changeMovieField}
        veryfied={setVeryfication}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={changeMovieField}
        veryfied={setVeryfication}
        customValidation={customValidation}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={changeMovieField}
        veryfied={setVeryfication}
        customValidation={customValidation}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={changeMovieField}
        veryfied={setVeryfication}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isVeryfied}
            onClick={() => {
              if (isVeryfied) {
                setCount(oldValue => oldValue + 1);
                onAdd(newMovie);
                reset();
              }
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
