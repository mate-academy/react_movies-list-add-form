import { useState } from 'react';
import { TextField } from '../TextField';

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [titleError, setTitleError] = useState(false);
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);
  const [imdbIdError, setImdbIdError] = useState(false);

  function onSubmit() {
    const isTitleValid = !!title.trim();
    const isImgUrlValid = !!imgUrl.trim();
    const isImdbUrlValid = !!imdbUrl.trim();
    const isImdbIdValid = !!imdbId.trim();

    setTitleError(!isTitleValid);
    setImgUrlError(!isImgUrlValid);
    setImdbUrlError(!isImdbUrlValid);
    setImdbIdError(!isImdbIdValid);

    if (!isTitleValid || !isImgUrlValid || !isImdbUrlValid || !isImdbIdValid) {
      return;
    }

    const movie = { title, description, imgUrl, imdbUrl, imdbId };

    onAdd(movie);

    // Reset all fields
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  const isFormValid =
    title.trim() !== '' &&
    imgUrl.trim() !== '' &&
    imdbUrl.trim() !== '' &&
    imdbId.trim() !== '';

  return (
    <form
      className="NewMovie"
      onSubmit={event => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        onBlur={() => setTitleError(!title.trim())}
        required
        error={titleError}
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
        onBlur={() => setImgUrlError(!imgUrl.trim())}
        required
        error={imgUrlError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        onBlur={() => setImdbUrlError(!imdbUrl.trim())}
        required
        error={imdbUrlError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        onBlur={() => setImdbIdError(!imdbId.trim())}
        required
        error={imdbIdError}
      />

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
