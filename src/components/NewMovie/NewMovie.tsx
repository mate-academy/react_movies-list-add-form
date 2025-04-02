import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasImgUrlError, setHasImgUrlError] = useState(false);
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  const isFormValid =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

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

    setHasTitleError(!title.trim());
    setHasImgUrlError(!imgUrl.trim());
    setHasImdbUrlError(!imdbUrl.trim());
    setHasImdbIdError(!imdbId.trim());

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

    setCount(prev => prev + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(changeEvent: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(changeEvent.target.value);
          setHasTitleError(false);
        }}
        onBlur={() => setHasTitleError(!title)}
        required
      />

      {hasTitleError && <p className="is-danger"> Title is required</p>}

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(changeEvent: React.ChangeEvent<HTMLInputElement>) => {
          setDescription(changeEvent.target.value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(changeEvent: React.ChangeEvent<HTMLInputElement>) => {
          setImgUrl(changeEvent.target.value);
          setHasImgUrlError(false);
        }}
        onBlur={() => setHasImgUrlError(!imgUrl)}
        required
      />

      {hasImgUrlError && <p className="is-danger"> Image URL is required</p>}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(changeEvent: React.ChangeEvent<HTMLInputElement>) => {
          setImdbUrl(changeEvent.target.value);
          setHasImdbUrlError(false);
        }}
        onBlur={() => setHasImdbUrlError(!imdbUrl)}
        required
      />

      {hasImdbUrlError && <p className="is-danger"> Imdb URL is required </p>}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(changeEvent: React.ChangeEvent<HTMLInputElement>) => {
          setImdbId(changeEvent.target.value);
          setHasImdbIdError(false);
        }}
        onBlur={() => setHasImdbIdError(!imdbId)}
        required
      />

      {hasImdbIdError && <p className="is-danger"> Imdb ID is required</p>}

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
