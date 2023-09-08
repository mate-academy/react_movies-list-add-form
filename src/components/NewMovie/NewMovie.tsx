import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovieState = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movie, setMovie] = useState(initialMovieState);
  const [count, setCount] = useState(0);
  const [linkImdbValidity, setLinkImdbValidity] = useState(false);
  const [linkImgValidity, setLinkImgValidity] = useState(false);
  const requiredCompleted
  = movie.title && movie.imgUrl && movie.imdbUrl && movie.imdbId
   && linkImdbValidity && linkImgValidity;

  const pattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?://)?)|(?:www\\.|[-;:&=+$,\\w]+@))[A-Za-z0-9.-]+'
    + '((?:\\/[+~%\\/.\\w-_]*)?\\??(?:[-+=&;%@,.\\w_]*)#?('
    + '?:[,.!/\\\\\\w]*))?)$',
  );

  const reset = () => {
    setMovie(initialMovieState);
    setLinkImdbValidity(false);
    setLinkImgValidity(false);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    if (!requiredCompleted) {
      return;
    }

    onAdd(movie);
    reset();
    setCount(count + 1);
  };

  const handleInputChange = (key: string, value: string) => {
    setMovie((prevFields) => {
      return {
        ...prevFields,
        [key]: value.trimStart(),
      };
    });

    if ((key === 'imgUrl')) {
      setLinkImgValidity(pattern.test(value));
    }

    if ((key === 'imdbUrl')) {
      setLinkImdbValidity(pattern.test(value));
    }
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleAdd}
    >
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
        linkValidity={linkImgValidity}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleInputChange}
        linkValidity={linkImdbValidity}
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
            disabled={!requiredCompleted}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
