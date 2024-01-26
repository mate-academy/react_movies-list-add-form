import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageURL] = useState('');
  const [imdbUrl, setImbdURL] = useState('');
  const [imdbId, setImbdId] = useState('');

  const handleReset = () => {
    setCount(count + 1);
    setTitle('');
    setDescription('');
    setImageURL('');
    setImbdURL('');
    setImbdId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleReset();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  const disabled = title.trim() === ''
  || imgUrl.trim() === '' || imdbUrl.trim() === '' || imdbId.trim() === '';

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
        onChange={setImageURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImbdURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImbdId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
