import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

export const getMovieById = (imdbId: string): Promise<Movie | undefined> => {
  return fetch('./api/movies.json')
    .then(response => response.json())
    .then((movies: Movie[]) => movies.find(movie => movie.imdbId === imdbId));
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [count, setCount] = useState(0);

  const handleFieldChange = (name: string, newValue: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      [name]: newValue,
    }));
  };

  const isInvalid =
    !movie.title.trim() ||
    !movie.imgUrl.trim() ||
    !movie.imdbUrl.trim() ||
    !movie.imdbId.trim();

  const handleImport = async () => {
    const id = movie.imdbId.trim();

    if (!id) {
      return;
    }

    try {
      const movieFromServer = await getMovieById(id);

      if (movieFromServer) {
        setMovie(movieFromServer);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching movie:', error);
    }
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onAdd({
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    });

    setCount(prevCount => prevCount + 1);

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newValue => handleFieldChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newValue => handleFieldChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={newValue => handleFieldChange('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newValue => handleFieldChange('imdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newValue => handleFieldChange('imdbId', newValue)}
        required
      />

      <div className="field">
        <div className="control">
          <button
            type="button"
            data-cy="import-button"
            className="button is-info is-light"
            onClick={handleImport}
          >
            Import by IMDb
          </button>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isInvalid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
