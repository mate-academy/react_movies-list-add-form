/* eslint-disable no-console */
import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = (props: Props) => {
  const { onAdd } = props;

  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isButtonAvailable = () => {
    if (title && imdbId && imgUrl && imdbUrl) {
      return true;
    }

    return false;
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();

        setCount(prev => prev + 1);
        setTitle('');
        setDescription('');
        setImgUrl('');
        setImdbUrl('');
        setImdbId('');

        onAdd({
          title,
          description,
          imgUrl,
          imdbUrl,
          imdbId,
        });
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(eventValue) => setTitle(eventValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(eventValue) => setDescription(eventValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(eventValue) => setImgUrl(eventValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(eventValue) => setImdbUrl(eventValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(eventValue) => setImdbId(eventValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isButtonAvailable()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
