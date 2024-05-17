import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const RESET_MOVIE_CARD = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>(RESET_MOVIE_CARD);

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const isNotValideImgUrl = newMovie.imgUrl && !pattern.test(newMovie.imgUrl);
  const isNotValideImdUrl = newMovie.imdbUrl && !pattern.test(newMovie.imdbUrl);

  const isNotComplited = () => {
    if (isNotValideImgUrl && isNotValideImdUrl) {
      return true;
    }

    for (const [key, value] of Object.entries(newMovie)) {
      if (key !== 'description' && !value.trim()) {
        return true;
      }
    }

    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (isNotValideImgUrl || isNotValideImdUrl) {
      return;
    }

    onAdd(newMovie);
    setCount(prev => prev + 1);
    setNewMovie(RESET_MOVIE_CARD);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(value: string) => {
          setNewMovie(prev => ({ ...prev, title: value }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(value: string) => {
          setNewMovie(prev => ({ ...prev, description: value }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(value: string) => {
          setNewMovie(prev => ({ ...prev, imgUrl: value }));
        }}
        required
      />
      {isNotValideImgUrl && (
        <p className="help is-danger">Image URL is not valid</p>
      )}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(value: string) => {
          setNewMovie(prev => ({ ...prev, imdbUrl: value }));
        }}
        required
      />
      {isNotValideImdUrl && (
        <p className="help is-danger">Imdb URL is not valid!</p>
      )}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(value: string) => {
          setNewMovie(prev => ({ ...prev, imdbId: value }));
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isNotComplited()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
