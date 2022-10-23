import { useState } from 'react';
import { TextField } from '../TextField';
import { ErrorMessage } from '../ErrorMessage';
import './NewMovie.scss';

type Props = {
  onAdd: any;
};

// eslint-disable-next-line max-len
const patternUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isError, setIsError] = useState(false);

  const increase = () => {
    setCount(current => current + 1);
  };

  let isAddMovie = true;

  function showErrorMessage(): boolean {
    setIsError(true);
    setTimeout(setIsError, 5000, false);

    return false;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!patternUrl.test(imgUrl) && !patternUrl.test(imdbUrl)) {
      isAddMovie = showErrorMessage();
    }

    if (isAddMovie) {
      increase();
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      onAdd(title, description, imgUrl, imdbUrl, imdbId);
    }
  }

  return (
    <>
      <form
        className="NewMovie"
        key={count}
        onSubmit={(event) => handleSubmit(event)}
      >
        <h2 className="title">Add a movie</h2>

        <TextField
          name="title"
          label="Title"
          value={title}
          onChange={(event) => setTitle(event)}
          required
        />

        <TextField
          name="description"
          label="Description"
          value={description}
          onChange={(event) => setDescription(event)}
        />

        <TextField
          name="imgUrl"
          label="Image URL"
          value={imgUrl}
          onChange={(event) => setImgUrl(event)}
          required
        />

        <TextField
          name="imdbUrl"
          label="Imdb URL"
          value={imdbUrl}
          onChange={(event) => setImdbUrl(event)}
          required
        />

        <TextField
          name="imdbId"
          label="Imdb ID"
          value={imdbId}
          onChange={(event) => setImdbId(event)}
          required
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled={!(title && imgUrl && imdbUrl && imdbId)}
            >
              Add
            </button>
          </div>
        </div>
      </form>

      {isError && <ErrorMessage />}
    </>
  );
};
