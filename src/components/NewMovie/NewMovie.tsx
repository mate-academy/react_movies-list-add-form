import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [isValid, setIsValid] = useState({
    imgUrl: true,
    imdbUrl: true,
  });

  const [newMovie, setNewMovie] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });

  const isFieldsFilled = (movieToCheck: Movie): boolean => {
    return Object.entries(movieToCheck).every(([key, value]) => {
      return key !== 'description'
        ? value.trim() !== ''
        : typeof value === 'string';
    });
  };

  const isUrlValid = (url: string): boolean => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  const changeHandler = (name: string, value: string) => {
    setNewMovie(currentMovie => ({
      ...currentMovie,
      [name]: value,
    }));
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validImdbUrl = isUrlValid(newMovie.imdbUrl);
    const validImgUrl = isUrlValid(newMovie.imgUrl);

    if (validImdbUrl && validImgUrl) {
      onAdd(newMovie);
      setCount(currentCount => currentCount + 1);
      setNewMovie({
        title: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
        description: '',
      });
      setIsValid({
        imgUrl: true,
        imdbUrl: true,
      });
    } else {
      setIsValid({
        imgUrl: validImgUrl,
        imdbUrl: validImdbUrl,
      });
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={submitHandler}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={(name, value) => {
          changeHandler(name, value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(name, value) => {
          changeHandler(name, value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(name, value) => {
          changeHandler(name, value);
        }}
        isValid={isValid.imgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(name, value) => {
          changeHandler(name, value);
        }}
        isValid={isValid.imdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(name, value) => {
          changeHandler(name, value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFieldsFilled(newMovie)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
