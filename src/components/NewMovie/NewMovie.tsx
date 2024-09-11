import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

const pattern = new RegExp(
  '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
    '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[+~%\\/\\w-_]*)?' +
    '\\??(?:[-+=&;%@.\\w_]*)#?(?:[.!/\\\\\\w]*))?)$',
);

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
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

    setNewMovie(prevMovie => ({
      ...prevMovie,
      [name]: value,
    }));

    if (name === 'title') {
      setIsValid(prev => ({ ...prev, title: !!value.trim() }));
    }

    if (name === 'imgUrl' || name === 'imdbUrl') {
      setIsValid(prev => ({ ...prev, [name]: validateUrl(value) }));
    }

    if (name === 'imdbId') {
      setIsValid(prev => ({ ...prev, imdbId: !!value.trim() }));
    }
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    const { title, imgUrl, imdbUrl, imdbId } = newMovie;
    const isFormValid =
      !!title.trim() &&
      !!imgUrl.trim() &&
      validateUrl(imgUrl) &&
      !!imdbUrl.trim() &&
      validateUrl(imdbUrl) &&
      !!imdbId.trim();

    if (!isFormValid) {
      return;
    }

    onAdd(newMovie);

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
  };

  const isSubmitDisabled = !(
    isValid.title &&
    validateUrl(newMovie.imgUrl) &&
    validateUrl(newMovie.imdbUrl) &&
    !!newMovie.imdbId.trim()
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
