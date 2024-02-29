import { ChangeEvent, FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  // eslint-disable-next-line max-len, prettier/prettier
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const initialInputsState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [inputs, setInputs] = useState(initialInputsState);
  const { title, description, imgUrl, imdbUrl, imdbId } = inputs;

  const isFilled = !title || !imgUrl || !imdbUrl || !imdbId;

  const [imgUrlError, setImgUrlError] = useState('');
  const [imdbUrlError, setImdbUrlError] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));

    if (!pattern.test(imgUrl)) {
      setImgUrlError('');
    } else if (!pattern.test(imdbUrl)) {
      setImdbUrlError('');
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (isFilled) {
      return;
    }

    if (!pattern.test(imgUrl)) {
      setImgUrlError(' should have valid text');
    }

    if (!pattern.test(imdbUrl)) {
      setImdbUrlError(' should have valid text');
    }

    if (isFilled || !pattern.test(imgUrl) || !pattern.test(imdbUrl)) {
      return;
    }

    onAdd(inputs);
    setCount(count + 1);
    setInputs(initialInputsState);
    setImgUrlError('');
    setImdbUrlError('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleInputChange}
        error={imgUrlError}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleInputChange}
        error={imdbUrlError}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isFilled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
