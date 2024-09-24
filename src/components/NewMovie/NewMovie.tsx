import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const handleImgUrlChange = (newImgUrl: string) => {
    setImgUrl(newImgUrl);
    setImgUrlError(false);
  };

  const handleImdbUrlChange = (newImdbUrl: string) => {
    setImdbUrl(newImdbUrl);
    setImdbUrlError(false);
  };

  const handleImdbIdChange = (newImdbId: string) => {
    setImdbId(newImdbId);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!pattern.test(imgUrl)) {
      setImgUrlError(true);
    }

    if (!pattern.test(imdbUrl)) {
      setImdbUrlError(true);
    }

    if (!pattern.test(imgUrl) || !pattern.test(imdbUrl)) {
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
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        onChange={handleDescriptionChange}
        value={description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        imgUrlError={imgUrlError}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        imdbUrlError={imdbUrlError}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !title ||
              !imgUrl ||
              !imdbUrl ||
              !imdbId ||
              imgUrlError ||
              imdbUrlError
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
