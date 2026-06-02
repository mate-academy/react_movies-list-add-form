import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdId] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAdd({
      title: title,
      description: description,
      imdbId: imdbId,
      imdbUrl: imdbUrl,
      imgUrl: imageUrl,
    });
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdId('');
    setCount(current => current + 1);
  }

  const getButtonActive = () => {
    if (!title) {
      return false;
    }

    if (!imageUrl) {
      return false;
    }

    if (!imdbUrl) {
      return false;
    }

    if (!imdbId) {
      return false;
    }

    return true;
  };

  const isButtonActive = getButtonActive();

  return (
    <form
      className="NewMovie"
      onSubmit={event => handleSubmit(event)}
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={e => setTitle(e.trimStart())}
        required
      />
      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={e => setDescription(e.trimStart())}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrl}
        onChange={e => setImageUrl(e.trimStart())}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={e => setImdbUrl(e.trimStart())}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={e => setImdId(e.trimStart())}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonActive === false}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
