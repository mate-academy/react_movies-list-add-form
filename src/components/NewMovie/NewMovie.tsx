import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (addedMovie: Movie) => void,
};

// eslint-disable-next-line max-len
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const validateUrl = (url: string) => {
  return !pattern.test(url);
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const checkUrl = () => {
    setImdbUrlError(validateUrl(newMovie.imdbUrl));
    setImgUrlError(validateUrl(newMovie.imdbUrl));
  };

  const isEnabled = newMovie.title && newMovie.imgUrl
  && newMovie.imdbUrl && newMovie.imdbId;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewMovie((prevMovie: Movie) => ({
      ...prevMovie, [name]: value.trimStart(),
    }));
  };

  const clear = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setImdbUrlError(false);
    setImgUrlError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (imgUrlError || imdbUrlError) {
      return;
    }

    onAdd(newMovie);
    clear();
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
        value={newMovie.title}
        placeholder=""
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        placeholder=""
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        placeholder=""
        onChange={handleChange}
        hasUrlError={imgUrlError}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        placeholder=""
        onChange={handleChange}
        hasUrlError={imdbUrlError}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        placeholder=""
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={checkUrl}
            disabled={!isEnabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
