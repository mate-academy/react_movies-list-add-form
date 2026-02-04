import React, { useState } from 'react';
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

  const isFilled = (value: string) => value.trim().length > 0;

  const isFormValid =
    isFilled(title) &&
    isFilled(imgUrl) &&
    isFilled(imdbUrl) &&
    isFilled(imdbId);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const newMovie: Movie = {
      title: title.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
      description: description.trim(),
    };

    onAdd(newMovie);

    // ❗ ВАЖНО: НИЧЕГО НЕ СБРАСЫВАЕМ
    // Сброс формы делает App.tsx через смену key
  };

  return (
    <form onSubmit={handleSubmit} data-cy="movie-form">
      <TextField
        name="title"
        label="Title"
        value={title}
        required
        onChange={setTitle}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={setImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={imdbUrl}
        required
        onChange={setImdbUrl}
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={imdbId}
        required
        onChange={setImdbId}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <button
        type="submit"
        className="button is-primary"
        data-cy="submit-button"
        disabled={!isFormValid}
      >
        Add movie
      </button>
    </form>
  );
};
