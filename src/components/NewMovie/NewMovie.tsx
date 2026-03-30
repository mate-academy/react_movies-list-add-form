import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const isFormValid =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const movie: Movie = {
      title: title.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
      description: description.trim(),
    };

    onAdd(movie);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
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
        label="IMDB URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />
      <TextField
        name="imdbId"
        label="IMDB ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <button
        type="submit"
        data-cy="submit-button"
        className="button is-primary"
        disabled={!isFormValid}
      >
        Add movie
      </button>
    </form>
  );
};
