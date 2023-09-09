import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import './NewMovie.scss';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imdbValidError, setImdbValidError] = useState(false);
  const [imgValidError, setImgValidError] = useState(false);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setImdbValidError(false);
    setImgValidError(false);
  };

  const isUrlValid = (url: string) => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    return urlRegex.test(url);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !imgUrl || !imdbUrl || !imdbId) {
      return;
    }

    if (!isUrlValid(imdbUrl)) {
      if (!isUrlValid(imgUrl)) {
        setImgValidError(true);
        setImdbValidError(true);

        return;
      }

      setImdbValidError(true);

      return;
    }

    if (!isUrlValid(imgUrl)) {
      setImgValidError(true);

      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    reset();

    setCount((prevCount) => prevCount + 1);
  };

  const areRequiredFieldsFilled = title && imgUrl && imdbUrl && imdbId;

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
        onChange={setTitle}
        required
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
        required
      />

      {imgValidError && (
        <div className="error-message">
          Please enter valid URL for Img
        </div>
      )}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      {imdbValidError && (
        <div className="error-message">
          Please enter valid URL for IMDb
        </div>
      )}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!areRequiredFieldsFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
