import classNames from 'classnames';
import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isButtonDisabled = () => {
    return !(title && imgUrl && imdbUrl && imdbId);
  };

  const handleTitleChange = ((value: string) => setTitle(value));
  const handleDescriptionChange = ((value: string) => setDescription(value));
  const handleImageUrlChange = ((value: string) => setImgUrl(value));
  const handleimdbUrlChange = ((value: string) => setImdbUrl(value));
  const handleimdbIdChange = ((value: string) => setImdbId(value));

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = ((event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);
    reset();
  });

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
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
        value={imgUrl}
        onChange={handleImageUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleimdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleimdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className={classNames('button', 'is-link')}
            disabled={isButtonDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
