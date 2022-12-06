import { useState } from 'react';
import classNames from 'classnames';

import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
  };

  const isDisabled = () => {
    return title.trim() && imdbId.trim() && imdbUrl.trim() && imgUrl.trim();
  };

  const reverseIsDisabled = isDisabled();

  const handleFormSubmit = (event: React.FormEvent) => {
    const newMovie = {
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    };

    event.preventDefault();
    onAdd(newMovie);
    reset();
    setCount(state => state + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
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
            className={classNames(
              'button is-link',
              {
                'button is-link': reverseIsDisabled,
              },
            )}
            disabled={!reverseIsDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
