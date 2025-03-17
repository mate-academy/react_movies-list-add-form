import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [description, setDescription] = useState('');

  const resetForm = () => {
    setTitle('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
    setDescription('');
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(previousValue => previousValue + 1);

    resetForm();
  };

  const validateUrl = (value: string) => pattern.test(value);

  const areFieldsNotOk = !(
    title.trim() &&
    imgUrl.trim() &&
    imdbId.trim() &&
    imdbUrl.trim()
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
      onReset={resetForm}
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
        validationCB={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        validationCB={validateUrl}
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
            disabled={areFieldsNotOk}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
