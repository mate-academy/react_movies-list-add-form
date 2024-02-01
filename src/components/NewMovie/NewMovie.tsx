import React, { useState } from 'react';
import classNames from 'classnames';
import './NewMovie.scss';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbURL] = useState('');
  const [imdbId, setImdbId] = useState('');
  const isFormFilled = !title || !imgUrl || !imdbUrl || !imdbId;

  const clearFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbURL('');
    setImdbId('');

    setCount(count + 1);
  };

  const handleTitle = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDescription = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleImgURL = (newImgURL: string) => {
    setImgUrl(newImgURL);
  };

  const handleImdbURL = (newImdbURL: string) => {
    setImdbURL(newImdbURL);
  };

  const handleImdbId = (newImdbId: string) => {
    setImdbId(newImdbId);
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

    clearFields();
  };

  return (
    <form
      method="POST"
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
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
        onChange={handleImgURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbURL}
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
            className={classNames('button is-link', {
              disabled: isFormFilled,
            })}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
