import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isBodyShown, setIsBodyShown] = useState(false);

  const [count, setCount] = useState(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasImgUrlError, setHasImgUrlError] = useState(false);
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setHasTitleError(false);
    setHasImgUrlError(false);
    setHasImdbUrlError(false);
    setHasImdbIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasImgUrlError(!imgUrl);
    setHasImdbUrlError(!imdbUrl);
    setHasImdbIdError(!imdbId);

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    onAdd({
      title,
      description,
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
      action="../api/movies"
      method="POST"
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <h2 className="title">Add a movie</h2>
      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => {
          setTitle(value);
          setIsBodyShown(true);
        }}
        onBlur={() => setHasTitleError(!title)}
        isErrorMessage={hasTitleError}
        requiredErrorMessage="Title is required"
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => {
          setDescription(value);
          setIsBodyShown(true);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => {
          setImgUrl(value);
          setIsBodyShown(true);
        }}
        onBlur={() => setHasImgUrlError(!imgUrl)}
        isErrorMessage={hasImgUrlError}
        requiredErrorMessage="Image URL is required"
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => {
          setImdbUrl(value);
          setIsBodyShown(true);
        }}
        onBlur={() => setHasImdbUrlError(!imdbUrl)}
        isErrorMessage={hasImdbUrlError}
        requiredErrorMessage="Imdb URL is required"
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => {
          setImdbId(value);
          setIsBodyShown(true);
        }}
        onBlur={() => setHasImdbIdError(!imdbId)}
        isErrorMessage={hasImdbIdError}
        requiredErrorMessage="Imdb ID is required"
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isBodyShown}
            onSubmit={() => {
              setCount(count + 1);
              setIsBodyShown(false);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
