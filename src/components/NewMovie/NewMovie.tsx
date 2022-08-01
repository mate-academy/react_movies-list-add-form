import React, {
  FormEvent,
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

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const isCleared = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = useCallback((event: FormEvent) => {
    event.preventDefault();

    // eslint-disable-next-line max-len
    const regularUrl = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;
    const resultImdbUrl = regularUrl.test(newMovie.imdbUrl);
    const resultImdbId = regularUrl.test(newMovie.imdbId);

    if (!isDisabled && resultImdbUrl && resultImdbId) {
      onAdd(newMovie);
    }

    setCount(prev => prev + 1);
    isCleared();
  }, []);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <InputTextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <InputTextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <InputTextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <InputTextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <InputTextField
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
            disabled={isDisabled}
          >
            Add movie
          </button>
        </div>
      </div>

    </form>
  );
};

export default memo(NewMovie);
