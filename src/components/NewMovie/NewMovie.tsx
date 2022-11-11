import React, { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [customTitle, setTitle] = useState('');
  const [customDescription, setDescription] = useState('');
  const [customImgUrl, setImgUrl] = useState('');
  const [customImdbUrl, setImdbUrl] = useState('');
  const [customImdbId, setImdbId] = useState('');

  const increaseCount = () => {
    setCount(current => current + 1);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    onAdd({
      title: customTitle,
      description: customDescription,
      imgUrl: customImgUrl,
      imdbUrl: customImdbUrl,
      imdbId: customImdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    increaseCount();
  };

  const activeButton = (
    customTitle
    && customImgUrl
    && customImdbId
    && customImdbUrl
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={customTitle}
        onChange={(title) => {
          setTitle(title);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={customDescription}
        onChange={(description) => {
          setDescription(description);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={customImgUrl}
        onChange={(imgUrl) => {
          setImgUrl(imgUrl);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={customImdbUrl}
        onChange={(imdbUrl) => {
          setImdbUrl(imdbUrl);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={customImdbId}
        onChange={(imdbId) => {
          setImdbId(imdbId);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!activeButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
