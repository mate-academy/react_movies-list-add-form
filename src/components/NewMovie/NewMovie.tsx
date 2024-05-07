import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // #region states
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  // #endregion

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  // #region handlers
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleImgUrlChange = (newImgUrl: string) => {
    setImgUrl(newImgUrl);
  };

  const handleImdbUrlChange = (newImdbUrl: string) => {
    setImdbUrl(newImdbUrl);
  };

  const handleImdbIdChange = (newImdbId: string) => {
    setImdbId(newImdbId);
  };

  const isFormValid = title && imgUrl && imdbUrl && imdbId;

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    setCount(n => n + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
  };
  // #endregion

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmitForm}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        onChange={handleDescriptionChange}
        value={description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        onChange={handleImgUrlChange}
        value={imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        onChange={handleImdbUrlChange}
        value={imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        onChange={handleImdbIdChange}
        value={imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isFormValid}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
