/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// import { ValidURL } from '../../types/ValidURL';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const defaultMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [movie, setMovie] = useState({ ...defaultMovie });

  // const isValidURL = (url: string):ValidURL => {
  //   const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  //   const regex = new RegExp(pattern);
  //   const check = regex.test(url);
  //   const result: ValidURL = {
  //     isValid: check,
  //     errorMessage: check ? 'OK' : 'Invalid URL',
  //   };

  //   return result;
  // };

  const isHiddenAdd = !movie.title
    || !movie.imgUrl
    || !movie.imdbUrl
    || !movie.imdbId;

  // const isHiddenAdd = !movie.title
  //   || !movie.imgUrl
  //   || !isValidURL(movie.imdbUrl).isValid
  //   || !isValidURL(movie.imdbId).isValid;

  const reset = () => setMovie({ ...defaultMovie });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMovie(() => (
      { ...movie, [event.target.name]: event.target.value }
    ));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setCount((currentCount) => currentCount + 1);

    onAdd({
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    });

    reset();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(event) => handleChange(event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(event) => handleChange(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(event) => handleChange(event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(event) => handleChange(event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(event) => handleChange(event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isHiddenAdd}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
