import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (post: Movie) => void,
};

const startMovieForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieInfo, setMovieInfo] = useState(startMovieForm);

  const isButtonDisabled = (
    !movieInfo.title.trim()
    || !movieInfo.imgUrl.trim()
    || !movieInfo.imdbUrl.trim()
    || !movieInfo.imdbId.trim()
  );

  const reset = () => {
    setMovieInfo(startMovieForm);
  };

  const counterIncr = () => {
    setCount((prev) => prev + 1);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movieInfo);
    counterIncr();
    // setCount(count + 1);
    reset();
  };

  const handleChange = (key:string, value:string) => {
    setMovieInfo((movieForm:Movie) => ({ ...movieForm, [key]: value }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieInfo.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieInfo.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieInfo.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieInfo.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieInfo.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
