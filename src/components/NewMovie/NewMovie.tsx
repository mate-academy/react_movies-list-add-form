import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

// eslint-disable-next-line
const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(true);

  const [descrip, setDescrip] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState(true);
  const [hasImgUrlLinkErr, setHasImgUrlLinkErr] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(true);
  const [hasImdbUrlLinkErr, setHasImdbUrlLinkErr] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setHasImdbIdError] = useState(true);

  const disabled = hasTitleError || hasImgUrlError || hasImdbUrlError
    || hasImdbIdError;

  const handleTitle = (newValue: string) => {
    setTitle(newValue);

    if (newValue) {
      setHasTitleError(false);
    } else {
      setHasTitleError(true);
    }
  };

  const handleImgUrl = (newValue: string) => {
    setImgUrl(newValue);

    if (!newValue) {
      setHasImgUrlError(true);
      setHasImgUrlLinkErr(false);
    } else {
      setHasImgUrlError(false);
      if (!pattern.test(newValue)) {
        setHasImgUrlLinkErr(true);
      }
    }
  };

  const handleImdbUrl = (newValue: string) => {
    setImdbUrl(newValue);

    if (!newValue) {
      setHasImdbUrlError(true);
      setHasImdbUrlLinkErr(false);
    } else {
      setHasImdbUrlError(false);
      if (!pattern.test(newValue)) {
        setHasImdbUrlLinkErr(true);
      }
    }
  };

  const handleImdbId = (newValue: string) => {
    setImdbId(newValue);

    if (newValue) {
      setHasImdbIdError(false);
    } else {
      setHasImdbIdError(true);
    }
  };

  const reset = () => {
    setTitle('');
    setDescrip('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setHasTitleError(true);
    setHasImgUrlError(true);
    setHasImdbUrlError(true);
    setHasImdbIdError(true);

    setHasImgUrlLinkErr(false);
    setHasImdbUrlLinkErr(false);

    setCount(currentKey => currentKey + 1);
  };

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description: descrip,
      imgUrl,
      imdbUrl,
      imdbId,
    });

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
        onChange={handleTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descrip}
        onChange={value => setDescrip(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrl}
        required
        hasUrlError={hasImgUrlLinkErr}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrl}
        required
        hasUrlError={hasImdbUrlLinkErr}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
