import React, { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  // #region formStates
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const { title, description, imgUrl, imdbUrl, imdbId } = movie;

  const [isURLValid, setIsURLValid] = useState({
    imgUrl: false,
    imdbUrl: false,
  });
  // #endregion

  // #region handles
  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setMovie({
      ...movie,
      [name]: value,
    });
  };

  const handleURLCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const pattern =
      // eslint-disable-next-line
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    setIsURLValid({
      ...isURLValid,
      [name]: pattern.test(value.trim()),
    });
  };

  const isFormValid = () => {
    const emptyFieldsCheck = Object.values(movie).some(value => !value.trim());

    const URLInValidCheck = Object.values(isURLValid).some(
      validCheck => !validCheck,
    );

    return !(emptyFieldsCheck || URLInValidCheck);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setIsURLValid({
      imgUrl: false,
      imdbUrl: false,
    });

    setCount(count + 1);
  };
  // #endregion

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleChanges}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleChanges}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleChanges}
        isURLValid={isURLValid.imgUrl}
        setIsURLValid={handleURLCheck}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleChanges}
        isURLValid={isURLValid.imdbUrl}
        setIsURLValid={handleURLCheck}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleChanges}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
