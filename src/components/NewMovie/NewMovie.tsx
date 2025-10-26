import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd?: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [formKey, setFovmKey] = useState(0);

  const handleChange = (name: keyof Movie, newValue: string) => {
    setMovie(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const isFormValid = () => {
    return (
      movie.title.trim() !== '' &&
      movie.imgUrl.trim() !== '' &&
      movie.imdbUrl.trim() !== '' &&
      movie.imdbId.trim() !== ''
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    onAdd({
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    });

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setFovmKey(prev => prev + 1);
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit} key={formKey}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newValue => handleChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description ?? ''}
        onChange={newValue => handleChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        required
        onChange={newValue => handleChange('imgUrl', newValue)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        required
        onChange={newValue => handleChange('imdbUrl', newValue)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        required
        onChange={newValue => handleChange('imdbId', newValue)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
