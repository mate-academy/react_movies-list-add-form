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
    return title && imdbId && imdbUrl && imgUrl;
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
        onChange={(value) => {
          setTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => {
          setDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value) => {
          setImgUrl(value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value) => {
          setImdbUrl(value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => {
          setImdbId(value);
        }}
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
