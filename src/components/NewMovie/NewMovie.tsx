import { useState } from 'react';
import { TextField } from '../TextField/TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [touched, setTouched] = useState<Record<keyof Movie, boolean>>({
    title: false,
    description: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const handleChange = (name: keyof Movie) => (newValue: string) => {
    setMovie(prev => ({ ...prev, [name]: newValue }));
  };

  const handleBlur = (name: keyof Movie) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const isValid: Record<keyof Movie, boolean> = {
    title: movie.title.trim().length > 0,
    description: true,
    imgUrl: movie.imgUrl.trim().length > 0,
    imdbUrl: movie.imdbUrl.trim().length > 0,
    imdbId: movie.imdbId.trim().length > 0,
  };

  const isFormValid = Object.values(isValid).every(Boolean);

  const [formKey, setFormKey] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFormValid) {
      onAdd(movie);
      setMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      setTouched({
        title: false,
        description: false,
        imgUrl: false,
        imdbUrl: false,
        imdbId: false,
      });
      setFormKey(prev => prev + 1);
    }
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleChange('title')}
        onBlur={() => handleBlur('title')}
        error={!isValid.title && touched.title ? 'Title is required' : ''}
        data-cy="movie-title"
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange('description')}
        onBlur={() => handleBlur('description')}
        data-cy="movie-description"
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChange('imgUrl')}
        onBlur={() => handleBlur('imgUrl')}
        error={!isValid.imgUrl && touched.imgUrl ? 'Image URL is required' : ''}
        data-cy="movie-imgUrl"
        required
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={movie.imdbUrl}
        onChange={handleChange('imdbUrl')}
        onBlur={() => handleBlur('imdbUrl')}
        error={
          !isValid.imdbUrl && touched.imdbUrl ? 'IMDB URL is required' : ''
        }
        data-cy="movie-imdbUrl"
        required
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={movie.imdbId}
        onChange={handleChange('imdbId')}
        onBlur={() => handleBlur('imdbId')}
        error={!isValid.imdbId && touched.imdbId ? 'IMDB ID is required' : ''}
        data-cy="movie-imdbId"
        required
      />

      <button
        type="submit"
        data-cy="submit-button"
        className="button is-link"
        disabled={!isFormValid}
      >
        Add
      </button>
    </form>
  );
};
