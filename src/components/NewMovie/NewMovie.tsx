import { useState } from 'react';
import { TextField } from '../TextField';
import classNames from 'classnames';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  // const [isNoActiveButton, setIsNoActiveButton] = useState(true);
  const [titleValue, setTitleValue] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [reset, setReset] = useState(false);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title: titleValue,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitleValue('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setReset(true);
  };

  const isActive = () => {
    if (titleValue && imgUrl && imdbUrl && imdbId) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={setTitleValue}
        required={true}
        reset={reset}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        reset={reset}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required={true}
        reset={reset}
      />

      <TextField
        name="imdbUrl"
        value={imdbUrl}
        label="Imdb URL"
        onChange={setImdbUrl}
        required={true}
        reset={reset}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required={true}
        reset={reset}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className={classNames('button is-link', {
              isActiveButton: 'disabled',
            })}
            disabled={isActive()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
