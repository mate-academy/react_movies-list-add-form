import React, { useState } from 'react';
import './NewMovie.scss';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

const PATTERN_STR =
  '^((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
  '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[+~%/\\.\\w-_]*)?\\??' +
  '(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\w]*))?)$';
const URL_PATTERN = new RegExp(PATTERN_STR);

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [formKey, setFormKey] = useState(0);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setFormKey(prev => prev + 1);
  };

  const isFormValid =
    title.trim() !== '' &&
    imdbId.trim() !== '' &&
    URL_PATTERN.test(imgUrl) &&
    URL_PATTERN.test(imdbUrl);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Перевіряємо, чи onAdd взагалі існує перед викликом (захист від помилки)
    if (typeof onAdd === 'function') {
      const newMovie: Movie = {
        title: title.trim(),
        description: description.trim(),
        imgUrl: imgUrl.trim(),
        imdbUrl: imdbUrl.trim(),
        imdbId: imdbId.trim(),
      };

      onAdd(newMovie);
      resetForm();
    }
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
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
