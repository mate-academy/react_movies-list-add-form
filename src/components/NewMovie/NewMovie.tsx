import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidHttpUrl } from '../../Helpers';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImbdUrl] = useState('');
  const [imdbId, setImbdId] = useState('');

  const isRequired = title
    && isValidHttpUrl(imgUrl)
    && isValidHttpUrl(imdbUrl)
    && imdbId;

  const clearForm = () => {
    setCount(current => current + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImbdId('');
    setImbdUrl('');
  };

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newMovie);
    clearForm();
  };

  const handleTitle = (value: string) => {
    setTitle(value);
  };

  const handleDescription = (value: string) => {
    setDescription(value);
  };

  const handleImgUrl = (value: string) => {
    setImgUrl(value);
  };

  const handleImbdUrl = (value: string) => {
    setImbdUrl(value);
  };

  const handleImbdId = (value: string) => {
    setImbdId(value);
  };

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
        onChange={(value) => handleTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => handleDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => handleImgUrl(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => handleImbdUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => handleImbdId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isRequired}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
