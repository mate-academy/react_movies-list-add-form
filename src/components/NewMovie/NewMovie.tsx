import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImg] = useState('');
  const [imdbUrl, setUrl] = useState('');
  const [imdbId, setId] = useState('');

  const isDisabledButton: boolean =
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onAdd({ title, description, imgUrl, imdbUrl, imdbId });
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImg('');
    setUrl('');
    setId('');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    setCount(count => count + 1);
    onAdd({ title, description, imgUrl, imdbUrl, imdbId });
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
        onChange={setImg}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={() => {
              reset();
            }}
            disabled={isDisabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
