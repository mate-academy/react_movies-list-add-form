import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const pattern = new RegExp(
  '^((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
    '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[+~%/\\.\\w-_]*)?' +
    '\\??(?:[-+=&;%@,.\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$',
);

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(Date.now());

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setFormKey(Date.now());
  };

  const isFormValid =
    title.trim() !== '' &&
    imgUrl.trim() !== '' &&
    imdbUrl.trim() !== '' &&
    imdbId.trim() !== '' &&
    pattern.test(imgUrl) &&
    pattern.test(imdbUrl);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    const newMovie: Movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(newMovie);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} key={formKey} className="box">
      <TextField
        label="Title"
        name="title"
        value={title}
        onChange={setTitle}
        required
        data-cy="movie-title"
      />

      <TextField
        label="Description"
        name="description"
        value={description}
        onChange={setDescription}
        data-cy="movie-description"
      />

      <TextField
        label="Image URL"
        name="imgUrl"
        value={imgUrl}
        onChange={setImgUrl}
        required
        data-cy="movie-imgUrl"
        validate={v => pattern.test(v)}
      />

      <TextField
        label="IMDB URL"
        name="imdbUrl"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        data-cy="movie-imdbUrl"
        validate={v => pattern.test(v)}
      />

      <TextField
        label="IMDB ID"
        name="imdbId"
        value={imdbId}
        onChange={setImdbId}
        required
        data-cy="movie-imdbId"
      />

      <div className="field">
        <div className="control">
          <button
            type="submit"
            className="button is-primary"
            disabled={!isFormValid}
            data-cy="submit-button"
          >
            Add movie
          </button>
        </div>
      </div>
    </form>
  );
};
