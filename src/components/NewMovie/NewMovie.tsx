import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [imdbIdError, setImdbIdError] = useState(false);

  const handleInputChange = (
    event: string,
    setStateFunction: React.Dispatch<React.SetStateAction<string>>,
    setErrorFunction: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setStateFunction(event);
    setErrorFunction(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      setTitleError(true);
      setImgUrlError(true);
      setImdbUrlError(true);
      setImdbIdError(true);

      return;
    }

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setTitleError(false);
    setImgUrlError(false);
    setImdbUrlError(false);
    setImdbIdError(false);
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
        value={title}
        label="Title"
        onChange={(value) => handleInputChange(value, setTitle, setTitleError)}
        hasError={titleError}
      />

      <TextField
        name="description"
        value={description}
        label="Description"
        onChange={(value) => handleInputChange(value, setDescription, () => {})}
        hasError={false}
      />

      <TextField
        name="imgUrl"
        value={imgUrl}
        label="Image URL"
        onChange={(value) => handleInputChange(
          value,
          setImgUrl,
          setImgUrlError,
        )}
        hasError={imgUrlError}
      />

      <TextField
        name="imdbUrl"
        value={imdbUrl}
        label="Imdb URL"
        onChange={(value) => handleInputChange(
          value,
          setImdbUrl,
          setImdbUrlError,
        )}
        hasError={imdbUrlError}
      />

      <TextField
        name="imdbId"
        value={imdbId}
        label="Imdb ID"
        onChange={(value) => handleInputChange(
          value,
          setImdbId,
          setImdbIdError,
        )}
        hasError={imdbIdError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
