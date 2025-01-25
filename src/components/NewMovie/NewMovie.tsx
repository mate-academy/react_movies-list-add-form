import { useState } from 'react';
import { TextField } from '../TextField';
import { MoviesList } from '../MoviesList';

export interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');

  const [imdbUrl, setImdbUrl] = useState('');

  const [imdbId, setImdbId] = useState('');

  const [movies, setMovies] = useState<Movie[]>([]);

  const isFormValid =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const reset = () => {
    setTitle('');
    setImgUrl('');
    setDescription('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const newMovie: Movie = { title, imgUrl, imdbUrl, imdbId, description };

    setMovies(prevMovies => [...prevMovies, newMovie]);

    onAdd(newMovie);

    reset();

    setCount(prev => prev + 1);
  };

  return (
    <>
      <form className="NewMovie" key={count} onSubmit={handleAdd}>
        <h2 className="title">Add a movie</h2>

        <TextField
          name="title"
          label="Title"
          value={title}
          onChange={(value: string) => setTitle(value)}
          required
        />

        <TextField
          name="description"
          label="Description"
          onChange={(value: string) => setDescription(value)}
          value={description}
        />

        <TextField
          name="imgUrl"
          label="Image URL"
          value={imgUrl}
          onChange={(value: string) => setImgUrl(value)}
          required
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
          value={imdbUrl}
          onChange={(value: string) => setImdbUrl(value)}
          required
        />

        <TextField
          name="imdbId"
          label="Imdb ID"
          value={imdbId}
          onChange={(value: string) => setImdbId(value)}
          required
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled={!isFormValid}
            >
              Add
            </button>
          </div>
        </div>
      </form>
      <MoviesList movies={movies} />
    </>
  );
};
