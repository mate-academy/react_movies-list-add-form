import React, { useState } from 'react';
import { Movie, ChangeEvent } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

// eslint-disable-next-line
export const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = (({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [onBlurTitle, setOnBlurTitle] = useState(false);
  const [onBlurImgUrl, setOnBlurImgUrl] = useState(false);
  const [onBlurImdbUrl, setOnBlurImdbUrl] = useState(false);
  const [onBlurImdbId, setOnBlurImdbId] = useState(false);
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const reset = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (movie.title && movie.imgUrl && movie.imdbUrl && movie.imdbId) {
      onAdd(movie);
      setCount(count + 1);
      reset();
    }
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        if (!movie.title) {
          setOnBlurTitle(true);
        }

        break;

      case 'imgUrl':
        if (!movie.imgUrl && !pattern.test(value)) {
          setOnBlurImgUrl(true);
        }

        break;

      case 'imdbUrl':
        if (!movie.imdbUrl && !pattern.test(value)) {
          setOnBlurImdbUrl(true);
        }

        break;

      case 'imdbId':
        if (!movie.imdbId) {
          setOnBlurImdbId(true);
        }

        break;

      default:
        break;
    }
  };

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;

    setMovie(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === 'title') {
      setOnBlurTitle(false);
    }

    if (name === 'imgUrl') {
      setOnBlurImgUrl(false);
    }

    if (name === 'imdbUrl') {
      setOnBlurImdbUrl(false);
    }

    if (name === 'imdbId') {
      setOnBlurImdbId(false);
    }
  };

  const notActiveButton = (
    !movie.title
    || !movie.imgUrl
    || !movie.imdbUrl
    || !movie.imdbId
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onChange={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleChange}
        onBlur={handleOnBlur}
        isError={onBlurTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChange}
        onBlur={handleOnBlur}
        isError={onBlurImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange}
        onBlur={handleOnBlur}
        isError={onBlurImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChange}
        onBlur={handleOnBlur}
        isError={onBlurImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={notActiveButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
});
