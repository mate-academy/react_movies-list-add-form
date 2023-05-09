import { FormEventHandler, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';
import { urlPattern } from '../../pattern/regexp';

const validateUrl = (url: string) => urlPattern.test(url);

type Props = {
  handleAdd: (movie: Movie) => void;
};

export const NewMovie = ({ handleAdd }: Props) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isValidUrls = validateUrl(movie.imgUrl) && validateUrl(movie.imdbUrl);

  const isFormValid = movie.title && isValidUrls && movie.imdbId.trim();

  const handleInputChange = (key: string, value: string) => {
    setMovie({
      ...movie,
      [key]: value,
    });
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleAdd(movie);
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={submitHandler}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleInputChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleInputChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
