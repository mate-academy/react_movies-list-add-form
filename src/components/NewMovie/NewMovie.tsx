import React, { useState } from 'react';
import { TextField } from '../TextField';
import { InputEvent, Movie, InputValues } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

enum StringValues {
  title = '',
  description = '',
  imdbId = '',
  imgUrl = '',
  imdbUrl = '',
}

// eslint-disable-next-line
export const urlValidation = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = (({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [isImgUrlValid, setIsImgUrlValid] = useState(false);
  const [isImdbUrldValid, setIsImdbUrlValid] = useState(false);
  const [inputValues, setInputValues] = useState<InputValues>({
    title: false,
    imdbId: false,
    imgUrl: false,
    imdbUrl: false,
  });

  const [movie, setMovie] = useState({ ...StringValues });

  const reset = () => {
    setMovie({ ...StringValues });
    setInputValues({
      title: false,
      imdbId: false,
      imgUrl: false,
      imdbUrl: false,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (movie.title
      && movie.imgUrl
      && movie.imdbUrl
      && movie.imdbId
    ) {
      onAdd(movie);
      setCount(count + 1);
      reset();
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        if (!movie.title) {
          setInputValues({
            ...inputValues,
            title: true,
          });
        }

        break;

      case 'imgUrl':
        if (!movie.imgUrl || !urlValidation.test(value)) {
          setInputValues({
            ...inputValues,
            imgUrl: true,
          });
          setIsImgUrlValid(true);
        }

        break;

      case 'imdbUrl':
        if (!movie.imdbUrl || !urlValidation.test(value)) {
          setInputValues({
            ...inputValues,
            imdbUrl: true,
          });
          setIsImdbUrlValid(true);
        }

        break;

      case 'imdbId':
        if (!movie.imdbId) {
          setInputValues({
            ...inputValues,
            imdbId: true,
          });
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

    switch (name) {
      case 'title':
        setInputValues({
          ...inputValues,
          title: false,
        });

        break;

      case 'imgUrl':
        setInputValues({
          ...inputValues,
          imgUrl: false,
        });
        setIsImgUrlValid(false);

        break;

      case 'imdbUrl':
        setInputValues({
          ...inputValues,
          imdbUrl: false,
        });
        setIsImdbUrlValid(false);

        break;

      case 'imdbId':
        setInputValues({
          ...inputValues,
          imdbId: false,
        });

        break;

      default:
        break;
    }
  };

  const disableButton = (
    !movie.title.trim()
    || !movie.imdbId.trim()
    || isImgUrlValid
    || isImdbUrldValid
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
        isError={inputValues.title}
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
        isError={inputValues.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputChange}
        required
        onBlur={handleBlur}
        isError={inputValues.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputChange}
        required
        onBlur={handleBlur}
        isError={inputValues.imdbId}
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
