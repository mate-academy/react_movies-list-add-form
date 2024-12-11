import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imdbURL, setImdbURL] = useState('');
  const [imdbID, setImdbID] = useState('');

  const data = {
    title: title.trim(),
    description: description.trim(),
    imgUrl: imageURL.trim(),
    imdbUrl: imdbURL.trim(),
    imdbId: imdbID.trim(),
  };

  const acceptableForm = Boolean(
    data.title && data.imdbId && data.imdbUrl && data.imgUrl,
  );

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(data);

    setTitle('');
    setDescription('');
    setImageURL('');
    setImdbURL('');
    setImdbID('');

    setCount(n => n + 1);
  };

  return (
    <form className="NewMovie" onSubmit={submit} key={count}>
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
        value={imageURL}
        onChange={setImageURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbURL}
        onChange={setImdbURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbID}
        onChange={setImdbID}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!acceptableForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
