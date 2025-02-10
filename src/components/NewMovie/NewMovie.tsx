import { useState } from 'react';
import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: {
    title: string;
    imgUrl: string;
    imdbUrl: string;
    imdbId: string;
    description: string;
  }) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const clearForm = () => {
    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (title && imgUrl && imdbUrl && imdbId) {
      if (typeof onAdd === 'function') {
        onAdd({ title, imgUrl, imdbUrl, imdbId, description });
        setSuccessMessage('Movie added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        clearForm();
      }
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);

      return true;
    } catch (_) {
      return false;
    }
  };

  const isValidImdbUrl = (url: string) =>
    url.startsWith('https://www.imdb.com/title/');

  const isValidImdbId = (id: string) => /^tt\d+$/.test(id);

  const handleBlur = (field: string, value: string) => {
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, [field]: `${field} is required` }));
    } else {
      if (field === 'imgUrl' && !isValidUrl(value)) {
        setErrors(prev => ({ ...prev, [field]: 'Please provide a valid URL' }));
      } else if (field === 'imdbUrl' && !isValidImdbUrl(value)) {
        setErrors(prev => ({
          ...prev,
          [field]: 'Please provide a valid IMDb URL',
        }));
      } else if (field === 'imdbId' && !isValidImdbId(value)) {
        setErrors(prev => ({
          ...prev,
          [field]: 'Please provide a valid IMDb ID',
        }));
      } else {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} data-cy="new-movie-form">
      <h2>Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onBlur={e => handleBlur('title', e.target.value)}
        required
        data-cy="movie-title"
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        data-cy="movie-description"
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={e => setImgUrl(e.target.value)}
        onBlur={e => handleBlur('imgUrl', e.target.value)}
        required
        data-cy="movie-imgUrl"
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={e => setImdbUrl(e.target.value)}
        onBlur={e => handleBlur('imdbUrl', e.target.value)}
        required
        data-cy="movie-imdbUrl"
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={e => setImdbId(e.target.value)}
        onBlur={e => handleBlur('imdbId', e.target.value)}
        required
        data-cy="movie-imdbId"
      />

      <button
        type="submit"
        data-cy="submit-button"
        className="button is-link"
        disabled={!(title && imgUrl && imdbUrl && imdbId)}
      >
        Add
      </button>

      {Object.entries(errors).map(
        ([key, value]) =>
          value && (
            <p key={key} className="error-message">
              {value}
            </p>
          ),
      )}

      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>
  );
};
