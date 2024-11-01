import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState<Movie>({
    title: '',
    imdbId: '',
    imdbUrl: '',
    imgUrl: '',
    description: '',
  });
  const [isValidImg, setIsValidImg] = useState(false);
  const [isValidImdb, setIsValidImdb] = useState(false);

  function submitNewMovie(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { title, imdbId, imdbUrl, imgUrl } = newMovie;

    if (isValidImdb && isValidImg && title && imdbId && imdbUrl && imgUrl) {
      onAdd(newMovie);
      setCount(prev => prev + 1);
    }
  }

  return (
    <form className="NewMovie" key={count} onSubmit={submitNewMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(newValue: string) =>
          setNewMovie(prev => ({ ...prev, title: newValue }))
        }
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(newValue: string) =>
          setNewMovie(prev => ({ ...prev, description: newValue }))
        }
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(newValue: string) =>
          setNewMovie(prev => ({ ...prev, imgUrl: newValue }))
        }
        required
        onValid={setIsValidImg}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(newValue: string) =>
          setNewMovie(prev => ({ ...prev, imdbUrl: newValue }))
        }
        required
        onValid={setIsValidImdb}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(newValue: string) =>
          setNewMovie(prev => ({ ...prev, imdbId: newValue.trim() }))
        }
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidImg && !isValidImdb}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
