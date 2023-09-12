import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isValidUrl } from '../helper';

type Props = {
  handleMovieAdd: (movie: Movie) => void
};

const EMPTY_STRING = '';

export const NewMovie: React.FC<Props> = ({ handleMovieAdd }) => {
  const [count, setCount] = useState(0);

  const [movieData, setMovieData] = useState({
    title: EMPTY_STRING,
    description: EMPTY_STRING,
    imgUrl: EMPTY_STRING,
    imdbUrl: EMPTY_STRING,
    imdbId: EMPTY_STRING,
  });

  const [invalidUrl, setInvalidUrl] = useState(false);

  const handleChange = (field: string, newValue: string) => {
    setMovieData(prevData => ({
      ...prevData,
      [field]: newValue,
    }));
  };

  const handlerReset = () => {
    setMovieData({
      title: EMPTY_STRING,
      description: EMPTY_STRING,
      imgUrl: EMPTY_STRING,
      imdbUrl: EMPTY_STRING,
      imdbId: EMPTY_STRING,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidUrl(movieData.imgUrl) || !isValidUrl(movieData.imdbUrl)) {
      setInvalidUrl(true);

      return;
    }

    setInvalidUrl(false);

    handleMovieAdd(movieData);

    setCount((currentCount) => currentCount + 1);
    handlerReset();
  };

  const isAddButtonDisabled = !movieData.title
    || !movieData.imdbUrl
    || !movieData.imdbId;

  return (
    <form
      action="/api/posts"
      method="POST"
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieData.title}
        onChange={(newValue) => handleChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieData.description}
        onChange={(newValue) => handleChange('description', newValue)}

      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieData.imgUrl}
        onChange={(newValue) => handleChange('imgUrl', newValue)}
        onValidate={isValidUrl}
        required
      />
      {invalidUrl && <div style={{ color: 'red' }}>Invalid URL</div>}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieData.imdbUrl}
        onChange={(newValue) => handleChange('imdbUrl', newValue)}
        onValidate={isValidUrl}
        required
      />
      {invalidUrl && <div style={{ color: 'red' }}>Invalid URL</div>}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieData.imdbId}
        onChange={(newValue) => handleChange('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAddButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
