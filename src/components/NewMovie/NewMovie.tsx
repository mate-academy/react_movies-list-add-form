import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const INITIAL_MOVIE: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [newMovie, setNewMovie] = useState<Movie>({
    ...INITIAL_MOVIE,
  });

  const isAddAvailable =
    newMovie.title.trim() !== '' &&
    newMovie.imgUrl.trim() !== '' &&
    newMovie.imdbUrl.trim() !== '' &&
    newMovie.imdbId.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(newMovie);
    setNewMovie({
      ...INITIAL_MOVIE,
    });
    setCount(count + 1);
  };

  const handleFieldChange = (field: keyof Movie) => (value: string) => {
    setNewMovie(current => ({ ...current, [field]: value }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        required
        value={newMovie.title}
        onChange={handleFieldChange('title')}
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleFieldChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        value={newMovie.imgUrl}
        onChange={handleFieldChange('imgUrl')}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={newMovie.imdbUrl}
        onChange={handleFieldChange('imdbUrl')}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={newMovie.imdbId}
        onChange={handleFieldChange('imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isAddAvailable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
