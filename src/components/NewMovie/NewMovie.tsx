/* eslint-disable no-alert */
import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [description, setDescription] = useState('');

  const defaultValue = '';

  const isUrlValid = (value: string) => value.match(pattern);

  const reset = () => {
    setTitle(defaultValue);
    setDescription(defaultValue);
    setImgUrl(defaultValue);
    setImdbUrl(defaultValue);
    setImdbId(defaultValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isUrlValid(imgUrl) || !isUrlValid(imdbUrl)) {
      reset();

      alert('Looks like something went wrong, check your links');
    }

    const newMovie = {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
    };

    setCount(prev => prev + 1);

    onAdd(newMovie);
    reset();
  };

  const clickCondition = (title.trim() && imgUrl && imdbUrl && imdbId);

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
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
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
            disabled={!clickCondition}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
