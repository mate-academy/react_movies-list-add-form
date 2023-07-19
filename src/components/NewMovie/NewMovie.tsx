import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type AddNewMovie = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: React.FC<AddNewMovie> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const normalizedString = (string: string) => (
    string.trim()
  );

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title: normalizedString(title),
      description: normalizedString(description),
      imgUrl: normalizedString(imgUrl),
      imdbUrl: normalizedString(imdbUrl),
      imdbId: normalizedString(imdbId),
    };

    onAdd(newMovie);
    setCount(current => current + 1);
    reset();
  };

  const isDisabledButton = (
    !normalizedString(title)
    || !normalizedString(imgUrl)
    || !normalizedString(imdbUrl)
    || !normalizedString(imdbId)
  );

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => setTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image Url"
        value={imgUrl}
        onChange={value => setImgUrl((value))}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb Url"
        value={imdbUrl}
        onChange={value => setImdbUrl((value))}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => setImdbId((value))}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
