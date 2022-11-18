import React, { useState } from 'react';
import { Movie, ChangeEvent, InputValues } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

enum Input {
  TITLE = 'title',
  IMGURL = 'imgUrl',
  IMDBURL = 'imdbUrl',
  IMDBID = 'imdbId',
}

// eslint-disable-next-line
export const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = (({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [isImgUrlValid, setIsImgUrlValid] = useState(false);
  const [isImdbUrlValid, setIsImdbUrlValid] = useState(false);
  const [inputValues, setInputValues] = useState<InputValues>({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });
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
    setInputValues({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
    setCount(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      movie.title
      && movie.imgUrl
      && movie.imdbUrl
      && movie.imdbId
    ) {
      onAdd(movie);
      setCount(count + 1);
      reset();
    }
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = event.target;

    switch (name) {
      case Input.TITLE:
        if (!movie.title.trim()) {
          setInputValues({
            ...inputValues,
            title: true,
          });
        }

        break;

      case Input.IMGURL:
        if (!movie.imgUrl || !pattern.test(value)) {
          setInputValues({
            ...inputValues,
            imgUrl: true,
          });

          setIsImgUrlValid(true);
        }

        break;

      case Input.IMDBURL:
        if (!movie.imdbUrl || !pattern.test(value)) {
          setInputValues({
            ...inputValues,
            imdbUrl: true,
          });

          setIsImdbUrlValid(true);
        }

        break;

      case Input.IMDBID:
        if (!movie.imdbId.trim()) {
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

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;

    setMovie(prevState => ({
      ...prevState,
      [name]: value,
    }));

    switch (name) {
      case Input.TITLE:
        if (name === Input.TITLE && name === Input.TITLE.trim()) {
          setInputValues({
            ...inputValues,
            title: false,
          });
        }

        break;

      case Input.IMGURL:
        if (name === Input.IMGURL) {
          setInputValues({
            ...inputValues,
            imgUrl: false,
          });

          setIsImgUrlValid(false);
        }

        break;

      case Input.IMDBURL:
        if (name === Input.IMDBURL) {
          setInputValues({
            ...inputValues,
            imdbUrl: false,
          });

          setIsImdbUrlValid(false);
        }

        break;

      case Input.IMDBID:
        if (name === Input.IMDBID) {
          setInputValues({
            ...inputValues,
            imdbId: false,
          });
        }

        break;

      default:
        break;
    }
  };

  const notActiveButton = (
    !movie.title
    || !movie.imdbId
    || isImgUrlValid
    || isImdbUrlValid
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
        onChange={handleChange}
        onBlur={handleOnBlur}
        isError={inputValues.title}
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
        isError={inputValues.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange}
        onBlur={handleOnBlur}
        isError={inputValues.imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChange}
        onBlur={handleOnBlur}
        isError={inputValues.imdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            value="submit"
            disabled={notActiveButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
});
