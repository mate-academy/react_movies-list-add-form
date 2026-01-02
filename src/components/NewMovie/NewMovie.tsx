import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

const emptyMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState<Movie>(emptyMovie);

  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const handleFieldChange = (field: keyof Movie) => (value: string) => {
    setMovie(current => ({
      ...current,
      [field]: value,
    }));
  };

  // DRY: required fields checked dynamically
  const requiredFields: (keyof Movie)[] = [
    'title',
    'imgUrl',
    'imdbUrl',
    'imdbId',
  ];

  const isRequiredFilled = requiredFields.every(
    field => movie[field].trim() !== '',
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isRequiredFilled) {
      return;
    }

    // DRY: trim all string values dynamically
    const movieToAdd: Movie = Object.fromEntries(
      Object.entries(movie).map(([key, value]) => [key, value.trim()]),
    ) as Movie;

    onAdd(movieToAdd);

    // clear form
    setMovie(emptyMovie);

    // reset touched state inside TextField by remounting form
    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleFieldChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleFieldChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleFieldChange('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleFieldChange('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleFieldChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isRequiredFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
