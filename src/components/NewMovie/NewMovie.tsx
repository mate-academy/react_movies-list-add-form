import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};
// eslint-disable-next-line
const pattern =
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageURL] = useState('');
  const [imdbUrl, setImdbURL] = useState('');
  const [imdbId, setImdbID] = useState('');

  const cantSubmit =
    title.trim().length <= 0 ||
    imgUrl.trim().length <= 0 ||
    imdbId.trim().length <= 0 ||
    imdbUrl.trim().length <= 0 ||
    !pattern?.test(imgUrl.trim()) ||
    !pattern?.test(imdbUrl.trim());

  const reset = () => {
    setTitle('');
    setDescription('');
    setImageURL('');
    setImdbURL('');
    setImdbID('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (cantSubmit) {
      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
    reset();
    setCount(count + 1);
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
        onChange={setImageURL}
        required
        pattern={pattern}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbURL}
        required
        pattern={pattern}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbID}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={cantSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
