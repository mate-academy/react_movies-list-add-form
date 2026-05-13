import React, { useState } from 'react';
import { TextField } from '../TextField';

type Props = {
  onAdd: () => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const handleTitle = (newValue: string) => {
    setTitle(newValue);
  };

  const [description, setDescription] = useState('');

  const [imgUrl, setimgURL] = useState('');
  const handleImgUrl = (newValue: string) => {
    setimgURL(newValue);
  };

  const [imdbUrl, setimdbUrl] = useState('');
  const handleImdbUrl = (newValue: string) => {
    setimdbUrl(newValue);
  };

  const [imdbId, setimdbId] = useState('');
  const handleImdbId = (newValue: string) => {
    setimdbId(newValue);
  };

  const hasActive =
    title.trim() !== '' &&
    imgUrl.trim() !== '' &&
    imdbUrl.trim() !== '' &&
    imdbId.trim() !== '';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitle('');
    setDescription('');
    setimgURL('');
    setimdbUrl('');
    setimdbId('');

    setCount(currentCount => currentCount + 1);

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => setDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!hasActive}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
