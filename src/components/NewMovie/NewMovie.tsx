import React, { useState } from 'react';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movie);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount(prev => prev + 1);
  };

  const TitleValid = movie.title.trim().length > 0;
  const ImgValid = movie.imgUrl.trim().length > 0;
  const ImdbUrlValid = movie.imdbUrl.trim().length > 0;
  const ImdbIdValid = movie.imdbId.trim().length > 0;

  const FormValid = TitleValid && ImgValid && ImdbUrlValid && ImdbIdValid;

  const validateUrl = (value: string) => {
    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return !value || pattern.test(value);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={event => setMovie({ ...movie, title: event })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={event => setMovie({ ...movie, description: event })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={event => setMovie({ ...movie, imgUrl: event })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={event => setMovie({ ...movie, imdbUrl: event })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={event => setMovie({ ...movie, imdbId: event })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!FormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
