import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (onAdd: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setimbdUrl] = useState('');
  const [imdbId, setImbd] = useState('');

  const forValid = !title || !imgUrl || !imdbId || !imdbUrl;

  const handleEmptyInput = (value: string, callback:
  (param: string) => void) => {
    if (value === ' ') {
      return;
    }

    callback(value);
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
    setCount(current => current + 1);

    onAdd(newMovie);
    setDescription('');
    setImbd('');
    setImgUrl('');
    setTitle('');
    setImbd('');
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
        onChange={value => handleEmptyInput(value, setTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => handleEmptyInput(value, setDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => handleEmptyInput(value, setImgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => handleEmptyInput(value, setimbdUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => handleEmptyInput(value, setImbd)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={forValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
