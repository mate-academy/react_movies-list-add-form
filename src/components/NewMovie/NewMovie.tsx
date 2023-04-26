import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const initialMovieState = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [movie, setMovie] = useState(initialMovieState);

  const handleChange = (inputValue: string, property: string) => {
    setMovie(currentMovie => ({
      ...currentMovie,
      [property]: inputValue,
    }
    ));
  };

  const isMatch = (url: string) => {
    const pattern = new RegExp([
      '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+',
      '|(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)',
      '((?:\\/[+~%\\/\\.\\w-_]*)?\\??(?:[-+=&;%@,\\.\\w_]*)#?',
      '(?:[,.!/\\\\\\w]*))?)$',
    ].join(''));

    return pattern.test(url.trim());
  };

  const checkForDisablingButton = () => {
    const {
      title,
      imgUrl,
      imdbUrl,
      imdbId,
    } = movie;

    if (title.trim()
      && imgUrl.trim()
      && imdbId.trim()
      && imdbUrl.trim()
      && isMatch(imdbUrl)
      && isMatch(imgUrl)) {
      return false;
    }

    return true;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMovie(initialMovieState);
    setCount(count + 1);
    onAdd(movie);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(inputValue) => handleChange(inputValue, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(inputValue) => handleChange(inputValue, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(inputValue) => handleChange(inputValue, 'imgUrl')}
        url={movie.imgUrl}
        isMatch={isMatch(movie.imgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(inputValue) => handleChange(inputValue, 'imdbUrl')}
        url={movie.imdbUrl}
        isMatch={isMatch(movie.imdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(inputValue) => handleChange(inputValue, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={checkForDisablingButton()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
