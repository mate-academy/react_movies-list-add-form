import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

function normalize(value: string) {
  return value.trim();
}

function validateTitle(title: string) {
  const normalized = normalize(title);

  if (!normalized) {
    return 'Title is required';
  }

  if (normalized.length < 2 || normalized.length > 40) {
    return 'Title must be between 2 and 40 characters';
  }

  return '';
}

function validateDescription(description: string) {
  const normalized = normalize(description);

  if (!normalized) {
    return '';
  }

  if (normalized.length < 25 || normalized.length > 400) {
    return 'Description must be between 25 and 400 characters';
  }

  return '';
}

function isHttpUrl(url: string) {
  try {
    const parsed = new URL(url);

    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateRequiredUrl(url: string, fieldLabel: string) {
  const normalized = normalize(url);

  if (!normalized) {
    return `${fieldLabel} is required`;
  }

  if (!isHttpUrl(normalized)) {
    return `${fieldLabel} must be a valid URL`;
  }

  return '';
}

function validateImdbId(imdbId: string) {
  const normalized = normalize(imdbId);

  if (!normalized) {
    return 'Imdb ID is required';
  }

  if (normalized.length < 2 || normalized.length > 40) {
    return 'Imdb ID must be between 2 and 40 characters';
  }

  return '';
}

function createEmptyMovieForm() {
  return {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
}

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [form, setForm] = useState(createEmptyMovieForm);

  const errors = {
    title: validateTitle(form.title),
    description: validateDescription(form.description),
    imgUrl: validateRequiredUrl(form.imgUrl, 'Image URL'),
    imdbUrl: validateRequiredUrl(form.imdbUrl, 'Imdb URL'),
    imdbId: validateImdbId(form.imdbId),
  };
  const isFormValid = Object.values(errors).every(message => !message);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();

        if (!isFormValid) {
          return;
        }

        onAdd({
          title: normalize(form.title),
          description: normalize(form.description),
          imgUrl: normalize(form.imgUrl),
          imdbUrl: normalize(form.imdbUrl),
          imdbId: normalize(form.imdbId),
        });

        setForm(createEmptyMovieForm());
        setCount(prev => prev + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={form.title}
        required
        error={errors.title}
        onChange={title => setForm(prev => ({ ...prev, title }))}
      />

      <TextField
        name="description"
        label="Description"
        value={form.description}
        error={errors.description}
        onChange={description => setForm(prev => ({ ...prev, description }))}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={form.imgUrl}
        required
        error={errors.imgUrl}
        onChange={imgUrl => setForm(prev => ({ ...prev, imgUrl }))}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={form.imdbUrl}
        required
        error={errors.imdbUrl}
        onChange={imdbUrl => setForm(prev => ({ ...prev, imdbUrl }))}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={form.imdbId}
        required
        error={errors.imdbId}
        onChange={imdbId => setForm(prev => ({ ...prev, imdbId }))}
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
