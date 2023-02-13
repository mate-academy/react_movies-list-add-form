/* eslint-disable no-alert */
import { useState } from 'react';
import { DEFAULT_INPUT_VALUE } from '../../constants/default-values';
import {
  IMDB_URL_ERROR_MESSAGE,
  IMG_URL_ERROR_MESSAGE,
} from '../../constants/error-messages';
import { isUrlValid } from '../../helpers/is-url-valid';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const AddMovieForm: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [description, setDescription] = useState('');

  const reset = () => {
    setTitle(DEFAULT_INPUT_VALUE);
    setDescription(DEFAULT_INPUT_VALUE);
    setImgUrl(DEFAULT_INPUT_VALUE);
    setImdbUrl(DEFAULT_INPUT_VALUE);
    setImdbId(DEFAULT_INPUT_VALUE);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isUrlValid(imgUrl) || !isUrlValid(imdbUrl)) {
      reset();

      return !isUrlValid(imgUrl)
        ? alert(IMG_URL_ERROR_MESSAGE)
        : alert(IMDB_URL_ERROR_MESSAGE);
    }

    const newMovie = {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
      description,
    };

    onAdd(newMovie);
    reset();

    return setCount(prev => prev + 1);
  };

  const isAddButtonDisabled = (title.trim() && imgUrl && imdbUrl && imdbId);

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

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

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
            disabled={!isAddButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
