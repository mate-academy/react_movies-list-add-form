import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidUrl } from '../../services/validation';

const EMPTY_VALUE = '';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState(EMPTY_VALUE);
  const [description, setDescription] = useState(EMPTY_VALUE);
  const [imgUrl, setImgUrl] = useState(EMPTY_VALUE);
  const [imdbUrl, setImdbUrl] = useState(EMPTY_VALUE);
  const [imdbId, setImdbId] = useState(EMPTY_VALUE);

  const isFilledCorrectly = !!title.trim()
                         && !!imdbId.trim()
                         && isValidUrl(imgUrl)
                         && isValidUrl(imdbUrl);

  const reset = () => {
    setTitle(EMPTY_VALUE);
    setDescription(EMPTY_VALUE);
    setImgUrl(EMPTY_VALUE);
    setImdbUrl(EMPTY_VALUE);
    setImdbId(EMPTY_VALUE);

    setCount(currentCount => currentCount + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFilledCorrectly) {
      return;
    }

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    reset();
  };

  return (
    <form
      key={count}
      className="NewMovie"
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
        isValid={isValidUrl}
        errorMessage="Image URL is not valid URL"
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        isValid={isValidUrl}
        errorMessage="Imdb URL is not valid URL"
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
            disabled={!isFilledCorrectly}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
