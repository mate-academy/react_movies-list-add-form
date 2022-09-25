import { useState, FC, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setCount(count + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleChange = (setState: (value: string) => void,
    value: string): void => {
    setState(value);
  };

  const isError = !title.trim()
  || !imgUrl.trim()
  || !imdbUrl.trim()
  || !imdbId.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        label="Title"
        name="title"
        onChange={value => handleChange(setTitle, value)}
        required
        value={title}
      />

      <TextField
        label="Description"
        name="description"
        onChange={value => handleChange(setDescription, value)}
        value={description}
      />

      <TextField
        label="Image URL"
        name="imgUrl"
        onChange={value => handleChange(setImgUrl, value)}
        required
        value={imgUrl}
      />

      <TextField
        label="Imdb URL"
        name="imdbUrl"
        onChange={value => handleChange(setImdbUrl, value)}
        required
        value={imdbUrl}
      />

      <TextField
        label="Imdb ID"
        name="imdbId"
        onChange={value => handleChange(setImdbId, value)}
        required
        value={imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
