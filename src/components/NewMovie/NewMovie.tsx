import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd?: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [count, setCount] = useState(0);

  const isFormValid =
    movie.title.trim() !== '' &&
    movie.imgUrl.trim() !== '' &&
    movie.imdbUrl.trim() !== '' &&
    movie.imdbId.trim() !== '' &&
    !errors.title &&
    !errors.imgUrl &&
    !errors.imdbUrl &&
    !errors.imdbId;

  const handleBlur = (field: keyof typeof errors, value: string) => {
    let errorMsg = '';

    if (value.trim() === '') {
      errorMsg = 'This field is required';
    } else if (field === 'imgUrl' || field === 'imdbUrl') {
      const pattern = new RegExp(
        '^((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
          '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
          '((?:/[+~%/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?' +
          '(?:[,.!/\\\\\\w]*))?)$',
      );

      if (!pattern.test(value.trim())) {
        errorMsg = 'Please enter a valid URL';
      }
    }

    setErrors(prev => ({ ...prev, [field]: errorMsg }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onAdd) {
      onAdd(movie);
    }

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setErrors({ title: '', imgUrl: '', imdbUrl: '', imdbId: '' });
    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit} noValidate>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => setMovie(prev => ({ ...prev, title: value }))}
        onBlur={() => handleBlur('title', movie.title)}
        error={errors.title}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => setMovie(prev => ({ ...prev, description: value }))}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => setMovie(prev => ({ ...prev, imgUrl: value }))}
        onBlur={() => handleBlur('imgUrl', movie.imgUrl)}
        error={errors.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => setMovie(prev => ({ ...prev, imdbUrl: value }))}
        onBlur={() => handleBlur('imdbUrl', movie.imdbUrl)}
        error={errors.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => setMovie(prev => ({ ...prev, imdbId: value }))}
        onBlur={() => handleBlur('imdbId', movie.imdbId)}
        error={errors.imdbId}
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
  );
};
