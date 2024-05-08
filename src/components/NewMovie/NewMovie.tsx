import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (x: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const initialFilmInputs: Movie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [count, setCount] = useState(0);
  const [filmInputs, setFilmInputs] = useState(initialFilmInputs);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const { title, description, imgUrl, imdbUrl, imdbId } = filmInputs;

  const pattern =
    // eslint-disable-next-line
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const isValidForm =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const handleInputChangeText = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'imgUrl' || name === 'imdbUrl') {
      const isValid = pattern.test(value);

      setIsValidUrl(isValid);
    }

    setFilmInputs(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const resetInputsOnSubmit = () => {
    setFilmInputs(initialFilmInputs);
    setCount(prevCount => prevCount + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValidForm) {
      onAdd(filmInputs);
      resetInputsOnSubmit();
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleInputChangeText}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleInputChangeText}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleInputChangeText}
        isValid={isValidUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleInputChangeText}
        isValid={isValidUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleInputChangeText}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isValidForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
