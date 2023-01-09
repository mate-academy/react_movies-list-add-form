import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const defaultValue = '';
  const defaultInvalidString = 'Invalid URL';

  const [count, setCount] = useState(0);
  const [title, setTitle] = useState(defaultValue);
  const [description, setDescription] = useState(defaultValue);
  const [imgUrl, setImgUrl] = useState(defaultValue);
  const [imdbUrl, setImdbUrl] = useState(defaultValue);
  const [imdbId, setImdbId] = useState(defaultValue);

  const isFormFilled
     = title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const isValidParams = (value: string): boolean => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return !!value.match(pattern);
  };

  const increaseCountofMovies = () => {
    setCount(currentCount => currentCount + 1);
  };

  const clearForm = () => {
    setTitle(defaultValue);
    setDescription(defaultValue);
    setImgUrl(defaultValue);
    setImdbUrl(defaultValue);
    setImdbId(defaultValue);
  };

  const handleSubmit = () => {
    increaseCountofMovies();

    if (!isValidParams(imgUrl)) {
      setImgUrl(defaultInvalidString);

      return;
    }

    if (!isValidParams(imdbUrl)) {
      setImdbUrl(defaultInvalidString);

      return;
    }

    if (isFormFilled) {
      const newMovie: Movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      onAdd(newMovie);

      clearForm();
    }
  };

  return (
    <form
      className="NewMovie"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => {
          setTitle(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => {
          setDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event);
        }}
        required

      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event);
        }}
        required

      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
