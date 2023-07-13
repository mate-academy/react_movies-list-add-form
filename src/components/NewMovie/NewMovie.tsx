import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { urlPattern } from '../../services/validation/urlPattern';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const isDisabledButton = () => {
    return !title.trim()
      || !imgUrl.trim()
      || !imdbUrl.trim()
      || !imdbId.trim()
      || !urlPattern.test(imgUrl)
      || !urlPattern.test(imdbUrl);
  };

  const reset = () => {
    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');

    setCount(currentCount => currentCount + 1);
  };

  const newMovie: Movie = {
    title,
    imgUrl,
    description,
    imdbUrl,
    imdbId,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd(newMovie);
    reset();
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
        value={imgUrl}
        onChange={(value) => setImgUrl(value)}
        valid={urlPattern.test(imgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        valid={urlPattern.test(imdbUrl)}
        value={imdbUrl}
        onChange={(value) => setImdbUrl(value)}
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
            disabled={isDisabledButton()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
