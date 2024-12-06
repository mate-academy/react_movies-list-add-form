import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState('');
  const [title, setTitle] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [description, setDescription] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

  const checkAllFields = () => {
    return title && imgUrl && imdbUrl && imdbId
      ? setDisableSubmit(false)
      : setDisableSubmit(true);
  };

  const handleTitle = (newValue: string) => {
    setTitle(newValue);
    checkAllFields();
  };

  const handleImgUrl = (newValue: string) => {
    setImgUrl(newValue);
    checkAllFields();
  };

  const handleImdbUrl = (newValue: string) => {
    setImdbUrl(newValue);
    checkAllFields();
  };

  const handleImdbId = (newValue: string) => {
    setImdbId(newValue);
    checkAllFields();
  };

  const handleDescription = (newValue: string) => {
    setDescription(newValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');
    setCount(count + 1);
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
        onChange={handleDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disableSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
