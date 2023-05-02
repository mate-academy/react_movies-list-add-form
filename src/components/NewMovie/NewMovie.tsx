import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const newMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState({ ...newMovie });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(movie);
    setMovie({ ...newMovie });
    setCount(prevCount => prevCount + 1);
  };

  const handleFormInput = (title: string, inputName: string) => {
    if (!title.trim()) {
      return;
    }

    setMovie(movieCur => {
      const updatedMovie = { ...movieCur };

      updatedMovie[inputName as keyof Movie] = title;

      return updatedMovie;
    });
  };

  // eslint-disable-next-line max-len
  const URLpattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isAllInputsFilled = () => movie.title.trim() !== ''
    && movie.imdbId !== ''
    && URLpattern.test(movie.imdbUrl)
    && URLpattern.test(movie.imgUrl);

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
        value={movie.title}
        onChange={handleFormInput}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleFormInput}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleFormInput}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleFormInput}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleFormInput}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAllInputsFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
