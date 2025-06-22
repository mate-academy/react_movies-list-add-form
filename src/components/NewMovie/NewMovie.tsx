import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, updateCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlError, setImgUrlError] = useState('');

  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbUrlError, setImdbUrlError] = useState('');

  const [imdbId, setImdbId] = useState('');

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isFormValid =
    title.trim() !== '' &&
    imdbUrl.trim() !== '' &&
    imgUrl.trim() !== '' &&
    imdbId.trim() !== '';

  const hasErrorMsg = imgUrlError || imdbUrlError;

  const resetForm = () => {
    setImgUrlError('');
    setImdbUrlError('');
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const validateForm = (): boolean => {
    let isValid = true;

    if (!pattern.test(imdbUrl.trim())) {
      setImdbUrlError('is invalid');
      isValid = false;
    }

    if (!pattern.test(imgUrl.trim())) {
      setImgUrlError('is invalid');
      isValid = false;
    }

    return isValid;
  };

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(formData);
    resetForm();
    updateCount(currentCount => currentCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitFormHandler}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue => setTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => setDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        textError={imgUrlError}
        onChange={newValue => {
          setImgUrl(newValue);
          setImgUrlError('');
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        textError={imdbUrlError}
        onChange={newValue => {
          setImdbUrl(newValue);
          setImdbUrlError('');
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newValue => setImdbId(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid || Boolean(hasErrorMsg)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
