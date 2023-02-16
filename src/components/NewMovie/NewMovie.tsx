import { ChangeEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { CommonValues } from '../../CommonValues';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialFormState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [formState, setFormState] = useState(initialFormState);

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = formState;

  const areAllInputsValid = !!title && !!imgUrl && !!imdbUrl && !!imdbId;

  const areUrlsValid
    = CommonValues.VALIDATE_URL_REGEX.test(imgUrl)
    && CommonValues.VALIDATE_URL_REGEX.test(imdbUrl);

  let isFormValid = false;

  if (areAllInputsValid && areUrlsValid) {
    isFormValid = true;
  } else {
    isFormValid = false;
  }

  const handleFormChange = (e: ChangeEvent) => {
    setFormState((state) => ({
      ...state,
      [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement)
        .value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setCount((prevCount) => prevCount + 1);
    setFormState(initialFormState);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleFormSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleFormChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleFormChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleFormChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleFormChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleFormChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
