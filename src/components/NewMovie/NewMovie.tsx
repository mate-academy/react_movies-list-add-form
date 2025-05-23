import React, { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  description: string;
};

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedImgUrl = imgUrl.trim();
    const trimmedImdbUrl = imdbUrl.trim();
    const trimmedImdbId = imdbId.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedImgUrl || !trimmedImdbUrl || !trimmedImdbId) {
      return;
    }

    const newMovie: Movie = {
      title: trimmedTitle,
      imgUrl: trimmedImgUrl,
      imdbUrl: trimmedImdbUrl,
      imdbId: trimmedImdbId,
      description: trimmedDescription,
    };

    onAdd(newMovie);

    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
    setFormKey(prev => prev + 1);
  };

  const isFormValid =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

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
        label="IMDb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />
      <TextField
        name="imdbId"
        label="IMDb ID"
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
            disabled={!isFormValid}
          >
            add
          </button>
        </div>
      </div>
    </form>
  );
};
