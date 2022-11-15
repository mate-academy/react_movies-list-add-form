import React, { useState } from 'react';
import { TextField } from '../TextField';
import { InputEvent, Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};
// eslint-disable-next-line
export const urlValidation = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = (({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [isTitleBlur, setIsTitleBlur] = useState(false);
  const [isImgUrlBlur, setIsImgUrlBlur] = useState(false);
  const [isImdbIdBlur, setIsImdbIdBlur] = useState(false);
  const [isImdbUrlBlur, setIsImdbUrlBlur] = useState(false);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imdbId: '',
    imgUrl: '',
    imdbUrl: '',
  });

  const reset = () => {
    setMovie({
      title: '',
      description: '',
      imdbId: '',
      imgUrl: '',
      imdbUrl: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (movie.title && movie.imgUrl && movie.imdbUrl && movie.imdbId) {
      onAdd(movie);
      setCount(count + 1);
      reset();
      setIsTitleBlur(false);
      setIsImdbIdBlur(false);
      setIsImgUrlBlur(false);
      setIsImdbUrlBlur(false);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        if (!movie.title) {
          setIsTitleBlur(true);
        }

        break;

      case 'imgUrl':
        if (!movie.imgUrl || !urlValidation.test(value)) {
          setIsImgUrlBlur(true);
        }

        break;

      case 'imdbUrl':
        if (!movie.imdbUrl || !urlValidation.test(value)) {
          setIsImdbUrlBlur(true);
        }

        break;

      case 'imdbId':
        if (!movie.imdbId) {
          setIsImdbIdBlur(true);
        }

        break;

      default:
        break;
    }
  };

  const handleInputChange = (event: InputEvent) => {
    const { name, value } = event.target;

    setMovie(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'title') {
      setIsTitleBlur(false);
    }

    if (name === 'imgUrl') {
      setIsImgUrlBlur(false);
    }

    if (name === 'imdbUrl') {
      setIsImdbUrlBlur(false);
    }

    if (name === 'imdbId') {
      setIsImdbIdBlur(false);
    }
  };

  const disableButton = (
    !movie.title
    || !movie.imgUrl
    || !movie.imdbUrl
    || !movie.imdbId
  );

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
        value={movie.title}
        onChange={handleInputChange}
        required
        onBlur={handleBlur}
        isError={isTitleBlur}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleInputChange}
        required
        onBlur={handleBlur}
        isError={isImgUrlBlur}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputChange}
        required
        onBlur={handleBlur}
        isError={isImdbUrlBlur}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputChange}
        required
        onBlur={handleBlur}
        isError={isImdbIdBlur}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disableButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
});
