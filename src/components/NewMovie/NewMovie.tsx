import React, { useState, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const urlPattern = new RegExp(
  '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?' +
    '[A-Za-z0-9.-]+|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
    '((?:\\/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!\\/\\\\\\w]*))?)$',
);

const imdbIdPattern = /^tt\d+$/;

const initialMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState<Movie>({ ...initialMovie });
  const [formKey, setFormKey] = useState(0);

  const handleChange = (field: keyof Movie, value: string) => {
    setMovie(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = (): boolean => {
    const title = movie.title.trim();
    const imgUrl = movie.imgUrl.trim();
    const imdbUrl = movie.imdbUrl.trim();
    const imdbId = movie.imdbId.trim();

    return (
      Boolean(title && imgUrl && imdbUrl && imdbId) &&
      urlPattern.test(imgUrl) &&
      urlPattern.test(imdbUrl) &&
      imdbIdPattern.test(imdbId)
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid()) {
      return;
    }

    onAdd({
      title: movie.title.trim(),
      description: movie.description?.trim() || '',
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    });

    setMovie({ ...initialMovie });
    setFormKey(prev => prev + 1);
  };

  return (
    <form key={formKey} onSubmit={handleSubmit} className="box mt-5">
      <h2 className="title is-4">Add a new movie</h2>

      <TextField
        name="title"
        label="Title"
        placeholder="Movie title"
        value={movie.title}
        required
        minLength={1}
        onChange={value => handleChange('title', value)}
        dataCy="movie-title"
      />

      <TextField
        name="description"
        label="Description"
        placeholder="Optional description"
        value={movie.description ?? ''}
        onChange={value => handleChange('description', value)}
        dataCy="movie-description"
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        placeholder="https://some.site/image.jpg"
        value={movie.imgUrl}
        required
        pattern={urlPattern}
        patternError="Enter a valid URL"
        onChange={value => handleChange('imgUrl', value)}
        dataCy="movie-imgUrl"
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        placeholder="https://imdb.com/title/..."
        value={movie.imdbUrl}
        required
        pattern={urlPattern}
        patternError="Enter a valid URL"
        onChange={value => handleChange('imdbUrl', value)}
        dataCy="movie-imdbUrl"
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        placeholder="tt1234567"
        value={movie.imdbId}
        required
        pattern={imdbIdPattern}
        patternError="Use format tt1234567"
        onChange={value => handleChange('imdbId', value)}
        dataCy="movie-imdbId"
      />

      <button
        type="submit"
        className="button is-primary"
        disabled={!isFormValid()}
        data-cy="submit-button"
      >
        Add
      </button>
    </form>
  );
};
