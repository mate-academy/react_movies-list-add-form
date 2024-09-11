import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [isValid, setIsValid] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const validateUrl = (url: string) => pattern.test(url);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewMovie(prev => ({ ...prev, [name]: value }));
    if (name === 'imgUrl' || name === 'imdbUrl') {
      setIsValid(prev => ({ ...prev, [name]: validateUrl(value) }));
    } else {
      setIsValid(prev => ({ ...prev, [name]: !!value.trim() }));
    }
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    const isFormValid =
      !!newMovie.title.trim() &&
      !!newMovie.imgUrl.trim() &&
      validateUrl(newMovie.imgUrl) &&
      !!newMovie.imdbUrl.trim() &&
      validateUrl(newMovie.imdbUrl) &&
      !!newMovie.imdbId.trim();

    if (!isFormValid) {
      return;
    }

    onAdd(newMovie);

    // Reset the form
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setIsValid({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
    setCount(count + 1);
  };

  const isSubmitDisabled = !(
    isValid.title &&
    isValid.imgUrl &&
    isValid.imdbUrl &&
    isValid.imdbId
  );

  return (
    <form className="NewMovie">
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        required
        onChange={handleChange}
        onBlur={() =>
          setIsValid(prev => ({ ...prev, title: !!newMovie.title.trim() }))
        }
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={handleChange}
        onBlur={() =>
          setIsValid(prev => ({
            ...prev,
            imgUrl: validateUrl(newMovie.imgUrl),
          }))
        }
        customValidation={validateUrl}
        customValidationMessage="Invalid URL"
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={handleChange}
        onBlur={() =>
          setIsValid(prev => ({
            ...prev,
            imdbUrl: validateUrl(newMovie.imdbUrl),
          }))
        }
        customValidation={validateUrl}
        customValidationMessage="Invalid URL"
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        required
        onChange={handleChange}
        onBlur={() =>
          setIsValid(prev => ({ ...prev, imdbId: !!newMovie.imdbId.trim() }))
        }
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleClick}
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
