import { FormEvent, useState } from 'react';
import { Movie } from '../../react-app-env';
import { TextField } from '../TextField';

type Props = {
  onAdd: (value: Movie) => void
};

export const NewMovie = ({ onAdd } : Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUr] = useState('');
  const [imdbId, setImdbId] = useState('');
  const enableToAddFilm = !(title && imgUrl && imdbUrl && imdbId);

  const onReset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUr('');
    setImdbId('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    setCount(prevCount => prevCount + 1);

    onAdd(newMovie);

    onReset();
  };

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
        onChange={setImdbUr}
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
            disabled={enableToAddFilm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
