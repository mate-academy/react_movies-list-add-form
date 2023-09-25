import { useState } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const emptyMovieField = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState<Movie>({ ...emptyMovieField });

  const reset = () => {
    setMovie({ ...emptyMovieField });
  };

  const reqiuredIsEmpty = () => {
    return !(movie.title.trim()) || !(movie.imgUrl.trim())
      || !(movie.imdbUrl.trim()) || !(movie.imdbId.trim());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (reqiuredIsEmpty()) {
      return;
    }

    onAdd({ ...movie });

    setCount(count + 1);

    reset();
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
        value={movie.title}
        onChange={(newTitle) => setMovie({
          ...movie,
          title: newTitle,
        })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(newDescription) => setMovie({
          ...movie,
          description: newDescription,
        })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(newImgUrl) => setMovie({
          ...movie,
          imgUrl: newImgUrl,
        })}
        required
        validateUrl
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(newImdbUrl) => setMovie({
          ...movie,
          imdbUrl: newImdbUrl,
        })}
        required
        validateUrl
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(newImdbId) => setMovie({
          ...movie,
          imdbId: newImdbId,
        })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={reqiuredIsEmpty()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
