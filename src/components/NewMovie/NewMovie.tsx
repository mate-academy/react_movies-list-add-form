import {
  FC, FormEvent, useCallback, useState,
} from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

import { validateUrl } from '../../utils';

interface Props {
  onAdd: (movie: Movie) => void,
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isImgUrlValid, setIsImgUrlValid] = useState(true);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(true);

  const isFilled = title && imgUrl && imdbUrl && imdbId;
  const isValid = isImdbUrlValid && isImgUrlValid;
  const isButtonDisabled = !isFilled || !isValid;

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
    setCount(count + 1);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    resetForm();
  };

  const validateImgUrl = useCallback((url) => {
    setIsImgUrlValid(validateUrl(url));
  }, []);

  const validateImdbUrl = useCallback((url) => {
    setIsImdbUrlValid(validateUrl(url));
  }, []);

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
        setValue={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        setValue={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        setValue={setImgUrl}
        validate={validateImgUrl}
        valid={isImgUrlValid}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        setValue={setImdbUrl}
        validate={validateImdbUrl}
        valid={isImdbUrlValid}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        setValue={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
