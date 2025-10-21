import React, { useState } from 'react';
import { TextField } from '../TextField/TextField';

import type { Movie } from '../../App';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const [formKey, setFormKey] = useState(0);

  const isFormValid = [title, imgUrl, imdbUrl, imdbId].every(field =>
    field.trim(),
  );

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

    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
    setFormKey(prev => prev + 1);
  };

  return (
    <form key={formKey} className="NewMovie" onSubmit={handleSubmit}>
      <TextField name="title" value={title} onChange={setTitle} required />
      <TextField name="imgUrl" value={imgUrl} onChange={setImgUrl} required />
      <TextField
        name="imdbUrl"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />
      <TextField name="imdbId" value={imdbId} onChange={setImdbId} required />
      <TextField
        name="description"
        value={description}
        onChange={setDescription}
      />

      <button type="submit" data-cy="submit-button" disabled={!isFormValid}>
        Add movie
      </button>
    </form>
  );
};
