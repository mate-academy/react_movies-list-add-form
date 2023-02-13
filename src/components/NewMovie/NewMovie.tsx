import { useState } from 'react';

import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { pattern } from './ValidUrlPattern';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isMovieValid = title && imgUrl && imdbUrl && imdbId;
  const isValidUrl = (value: string) => !!value.match(pattern);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(currentCount => currentCount + 1);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidUrl(imgUrl) || !isValidUrl(imdbUrl)) {
      setImgUrl(!isValidUrl(imdbUrl) ? 'Invalid URL' : imgUrl);
      setImdbUrl(!isValidUrl(imdbUrl) ? 'Invalid URL' : imdbUrl);

      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    resetForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmitForm}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isMovieValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
