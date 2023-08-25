import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: ''
  });

  const resetForm = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: ''
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      ...movie
    };

    onAdd(newMovie);
    setCount(count + 1);

    resetForm();
  };

  // eslint-disable-next-line max-len
  const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const hasError = !movie.title.trim()
    || (!movie.imgUrl.trim() || !movie.imgUrl.trim().match(urlPattern))
    || (!movie.imdbUrl.trim() || !movie.imdbUrl.trim().match(urlPattern))
    || !movie.imdbId.trim()

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
        onChange={(value) => setMovie({ ...movie, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value) => setMovie({ ...movie, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value) => setMovie({ ...movie, imgUrl: value })}
        required
        isUrl
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value) => setMovie({ ...movie, imdbUrl: value })}
        required
        isUrl
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value) => setMovie({ ...movie, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasError}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
