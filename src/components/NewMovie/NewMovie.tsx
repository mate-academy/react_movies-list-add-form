import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setImgUrlError(false);
    setImdbUrlError(false);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    const isImgUrlValid = pattern.test(imgUrl);
    const isImdbUrlValid = pattern.test(imdbUrl);

    setImgUrlError(!isImgUrlValid);
    setImdbUrlError(!isImdbUrlValid);

    if (!isImgUrlValid || !isImdbUrlValid) {
      return;
    }

    setCount(prevCount => prevCount + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    reset();
  };

  const isFormValid =
    title && imgUrl && imdbUrl && imdbId && !imgUrlError && !imdbUrlError;

  return (
    <form className="NewMovie" key={count} onSubmit={handleAdd}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={event => setTitle(event)}
        onBlur={() => {}}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={event => setDescription(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={event => setImgUrl(event)}
        onBlur={() => setImgUrlError(!pattern.test(imgUrl))}
        required
      />
      {imgUrlError && <p className="help is-danger">Invalid Image URL</p>}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={event => setImdbUrl(event)}
        onBlur={() => setImdbUrlError(!pattern.test(imdbUrl))}
        required
      />
      {imdbUrlError && <p className="help is-danger">Invalid IMDb URL</p>}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={event => setImdbId(event)}
        onBlur={() => {}}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
