import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');

  const handleTitle = (newValue: string) => {
    setTitle(newValue);
  };

  const handleDescription = (newValue: string) => {
    setDescription(newValue);
  };

  const handleImageUrl = (newValue: string) => {
    setimgUrl(newValue);
  };

  const handleUrl = (newValue: string) => {
    setimdbUrl(newValue);
  };

  const handleId = (newValue: string) => {
    setimdbId(newValue);
  };

  const disabled: () => boolean = () => {
    if (!title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim()) {
      return true;
    }

    return false;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitle('');
    setDescription('');
    setimgUrl('');
    setimdbUrl('');
    setimdbId('');

    setCount((prevCount) => prevCount + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
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
        onChange={handleDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImageUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
