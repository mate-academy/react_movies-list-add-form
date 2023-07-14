import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isDisabled = !title || !image || !url || !imdbId;

  const addMovie: Movie = {
    title,
    description,
    imgUrl: image,
    imdbUrl: url,
    imdbId,
  };

  const reset = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isDisabled) {
      return;
    }

    onAdd(addMovie);
    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(value) => setTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value) => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={image}
        onChange={(value) => setImage(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={url}
        onChange={(value) => setUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value) => setImdbId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
