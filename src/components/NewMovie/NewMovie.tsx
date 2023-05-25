import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');

  const isDisbled = () => {
    if (title.trim().length !== 0
      && imgUrl.trim().length !== 0
      && imdbUrl.trim().length !== 0
      && imdbId.trim().length !== 0
    ) {
      return false;
    }

    return true;
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setimgUrl('');
    setimdbUrl('');
    setimdbId('');
  };

  const submitNewMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    setCount(prev => prev + 1);
    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitNewMovie}
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
        onChange={setimgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setimdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setimdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisbled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
