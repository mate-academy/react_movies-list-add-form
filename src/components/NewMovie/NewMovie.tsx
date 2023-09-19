import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);
  const [button, setButton] = useState(false);
  const handleTitleChange = (value: React.SetStateAction<string>) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value: React.SetStateAction<string>) => {
    setDescription(value);
  };

  const handleImgUrlChange = (value: React.SetStateAction<string>) => {
    setImgUrl(value);
  };

  const handleImdbUrlChange = (value: React.SetStateAction<string>) => {
    setImdbUrl(value);
  };

  const handleImdbIdChange = (value: React.SetStateAction<string>) => {
    setImdbId(value);
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(x => x + 1);
    reset();
  };

  const checkButton = (item: string) => {
    setButton(true);

    if (!item.length) {
      setButton(false);
    }
  };

  useEffect(() => {
    checkButton(title);
  }, [title]);

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
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!button}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
