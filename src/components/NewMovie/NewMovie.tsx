import { useState } from 'react';
import { TextField } from '../TextField';

const urlPattern = new RegExp(
  '^' +
    '((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+' +
    '|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
    '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?' +
    ')$',
);

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  rating?: string;
};

type Props = {
  onAdd?: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd = () => {} }) => {
  const [formKey, setFormKey] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    rating: '',
  });

  const handleChange = (field: keyof Movie, value: string) => {
    setMovie(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValid = ['title', 'imgUrl', 'imdbUrl', 'imdbId'].every(
    field => (movie[field as keyof Movie] || '').trim() !== '',
  );

  const isUrlValid = (url: string) => urlPattern.test(url);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    if (!isUrlValid(movie.imgUrl) || !isUrlValid(movie.imdbUrl)) {
      alert('Please enter valid URLs');

      return;
    }

    const newMovie = {
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    };

    onAdd(newMovie);

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      rating: '',
    });

    setFormKey(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={val => handleChange('title', val)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={val => handleChange('description', val)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={val => handleChange('imgUrl', val)}
        required
        validate={isUrlValid}
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={movie.imdbUrl}
        onChange={val => handleChange('imdbUrl', val)}
        required
        validate={isUrlValid}
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={movie.imdbId}
        onChange={val => handleChange('imdbId', val)}
        required
      />

      <TextField
        name="rating"
        label="Rating"
        value={movie.rating || ''}
        onChange={val => handleChange('rating', val)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
