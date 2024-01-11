import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { urlValidate } from '../../utils/urlValidate';

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const isSubmitDisabled = !title.trim()
    || !imgUrl.trim()
    || !imdbId.trim()
    || !imdbUrl.trim();

  const [hasImgUrlError, setHasImgUrlError] = useState(false);
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setNewMovie(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onUrlCheck = () => {
    setHasImdbUrlError(urlValidate(imdbUrl));
    setHasImgUrlError(urlValidate(imgUrl));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasImdbUrlError || hasImgUrlError) {
      return;
    }

    onAdd(newMovie);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prevCount => prevCount + 1);
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
        onChange={handleInput}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInput}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleInput}
        required
        hasUrlError={hasImgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleInput}
        required
        hasUrlError={hasImdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleInput}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
            onClick={onUrlCheck}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
