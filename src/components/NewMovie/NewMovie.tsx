import React, { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isRequired = title && imgUrl && imdbUrl && imdbId;
  const isButtonDisable = !isRequired;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
    setCount((currentCount) => currentCount + 1);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    });

    resetForm();
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
        setValue={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        setValue={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        setValue={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        setValue={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        setValue={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
