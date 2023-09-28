import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

// eslint-disable-next-line max-len
// const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const initialMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [count] = useState(0);
  const [movie, setMovie] = useState<Movie>(initialMovie);

  const isAllFilled = movie.title && movie.imgUrl && movie.imdbUrl
    && movie.imdbId;

  const isAnyErrors = !movie.title || !movie.imgUrl || !movie.imdbUrl
    || !movie.imdbId;


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isAllFilled) {
      return;
    }

    onAdd(initialMovie);
    setMovie(initialMovie);
  };

  const handleTitleChange = (newValue: string) => {
    setMovie({ ...movie, title: newValue });
  };

  const handleDescriptionChange = (newValue: string) => {
    setMovie({ ...movie, description: newValue });
  };

  const handleImgUrlChange = (newValue: string) => {
    setMovie({ ...movie, imgUrl: newValue });
  };

  const handleImdbUrlChange = (newValue: string) => {
    setMovie({ ...movie, imdbUrl: newValue });
  };

  const handleImdbIdChange = (newValue: string) => {
    setMovie({ ...movie, imdbId: newValue });
  };

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
        onChange={handleTitleChange}
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleDescriptionChange}
        required={false}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleImgUrlChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleImdbUrlChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleImdbIdChange}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAnyErrors}
            aria-disabled={isAnyErrors}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
