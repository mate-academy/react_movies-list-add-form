import React, {
  memo,
  useCallback,
  useState,
} from 'react';
import { Movie } from '../../types/Movie';
import InputTextField from '../InputTextField/InputTextField';

interface Props {
  onAdd: (movie: Movie) => void;
}

const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isDisabled = !title || !imgUrl || !imdbUrl || !imdbId;

  const clearForm = useCallback(() => {
    setTitle('');
    setDescription('');
    setImdbUrl('');
    setImgUrl('');
    setImdbId('');
  }, []);

  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    if (!isDisabled) {
      onAdd(newMovie);
    }

    setCount(current => current + 1);
    clearForm();
  }, [
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
    isDisabled,
    clearForm,
    onAdd,
  ]);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <InputTextField
        data-cy="form-title"
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <InputTextField
        data-cy="form-description"
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <InputTextField
        data-cy="form-imgUrl"
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <InputTextField
        data-cy="form-imdbUrl"
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <InputTextField
        data-cy="form-imdbId"
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
            data-cy="form-submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default memo(NewMovie);
