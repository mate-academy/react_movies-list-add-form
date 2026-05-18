import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isValidUrl = (value: string) => URL_REGEX.test(value.trim());
  const isFormInvalid =
    !title.trim() ||
    !imgUrl.trim() ||
    !isValidUrl(imgUrl) ||
    !imdbUrl.trim() ||
    !isValidUrl(imdbUrl) ||
    !imdbId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormInvalid) {
      return;
    }

    const newMovie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imdbUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(newMovie);

    setCount(prev => prev + 1);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
        validate={isValidUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        validate={isValidUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
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
            disabled={isFormInvalid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
