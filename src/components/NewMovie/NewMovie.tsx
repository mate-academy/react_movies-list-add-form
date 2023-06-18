import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const resetForm = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const isIncompleteFields = () => {
    const filledCount = Object.values(newMovie).reduce((counter, value) => {
      if (value && value.length) {
        return counter + 1;
      }

      return counter;
    }, 0);

    return filledCount < 4;
  };

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!isIncompleteFields()) {
      onAdd(newMovie);
      resetForm();
    }

    setCount(prevCount => prevCount + 1);
  };

  const validation = (url: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  const handleChange = (newName: string, value: string) => {
    setNewMovie(movie => ({
      ...movie,
      [newName]: value.trim(),
    }));
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
        isURLValid={validation}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        isURLValid={validation}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isIncompleteFields()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
