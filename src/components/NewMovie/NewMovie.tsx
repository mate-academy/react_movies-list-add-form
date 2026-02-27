import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    // очищення не потрібне — форма перезавантажується через key
  };

  const isDisabled =
    !title.trim() ||!imgUrl.trim() ||
    !imdbUrl.trim() ||
    !imdbId.trim();

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <TextField
        name="title"
        value={title}
        onChange={setTitle}
        label="Title"
        required
      />

    <TextField
      name="description"
      value={description}
      onChange={setDescription}
      label="Description"
    />

    <TextField
      name="imgUrl"
      value={imgUrl}
      onChange={setImgUrl}
      label="Image URL"
      required
    />

    <TextField
      name="imdbUrl"
      value={imdbUrl}
      onChange={setImdbUrl}
      label="IMDB URL"
      required
    />

    <TextField
      name="imdbId"
      value={imdbId}
      onChange={setImdbId}
      label="IMDB ID"
      required
    />

    <button
      type="submit"
      data-cy="submit-button"
      className="button is-link"
      disabled={isDisabled}
    >
      Add
    </button>
  </form>
);

};
