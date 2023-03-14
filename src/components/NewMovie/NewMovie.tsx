import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [isError, setIsError] = useState(false);
  const [isErrorImg, setIsErrorImg] = useState(false);

  const applyValidation = (value: string, nameField: string) => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    switch (nameField) {
      case 'imdbUrl':
        setIsError(
          !value.match(pattern) && true,
        );
        break;

      case 'imgUrl':
        setIsErrorImg(
          !value.match(pattern) && true,
        );
        break;

      default:
        break;
    }
  };

  const updateCurrentField = (fieldName: string, value: string) => {
    switch (fieldName) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'imdbId':
        setImdbId(value);
        break;
      case 'imdbUrl':
        setImdbUrl(value);
        break;
      case 'imgUrl':
        setImgUrl(value);
        break;
      default:
        break;
    }
  };

  const setMovieField = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name } = event.target;

    applyValidation(value, name);
    updateCurrentField(name, value);
  };

  const clearingForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
    setCount(counter => (counter + 1));
  };

  const activeButton = !(
    !title || !imdbId || !imdbUrl || !imgUrl || isError || isErrorImg
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (activeButton) {
      onAdd({
        title,
        description,
        imdbId,
        imdbUrl,
        imgUrl,
      });
      clearingForm();
    }
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
        label="Title"
        value={title}
        onChange={setMovieField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setMovieField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setMovieField}
        showErrorImg={isErrorImg}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setMovieField}
        showError={isError}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setMovieField}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            disabled={!activeButton}
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
