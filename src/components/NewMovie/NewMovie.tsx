import { useState } from 'react';
import { TextField } from '../../components/TextField/TextField';
import { Movie } from '../../types/Movie';

const URL_PATTERN = /^https?:\/\/.+/;

const validateUrl = (value: string): string | null => {
  if (!value.trim()) {
    return null;
  }

  return URL_PATTERN.test(value.trim()) ? null : 'Please enter a valid URL';
};

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [formKey, setFormKey] = useState(0);

  const isFormValid =
    title.trim() !== '' &&
    imgUrl.trim() !== '' &&
    imdbUrl.trim() !== '' &&
    imdbId.trim() !== '' &&
    URL_PATTERN.test(imgUrl.trim()) &&
    URL_PATTERN.test(imdbUrl.trim());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const movie: Movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(movie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setFormKey(prev => prev + 1);
  };

  return (
    <form key={formKey} className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="NewMovie__title">Add a movie</h2>

      <TextField
        data-cy="movie-title"
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        data-cy="movie-description"
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        data-cy="movie-imgUrl"
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
        validate={validateUrl}
      />

      <TextField
        data-cy="movie-imdbUrl"
        name="imdbUrl"
        label="IMDB URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        validate={validateUrl}
      />

      <TextField
        data-cy="movie-imdbId"
        name="imdbId"
        label="IMDB ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <button
        data-cy="submit-button"
        type="submit"
        className="button"
        disabled={!isFormValid}
      >
        Add movie
      </button>
    </form>
  );
};
