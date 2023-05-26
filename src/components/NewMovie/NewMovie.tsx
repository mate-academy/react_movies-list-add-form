import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Add = (movie: Movie) => void;

export const NewMovie = ({ onAdd } : { onAdd: Add }) => {
  const [count, setCount] = useState(0);
  const [movieState, setMovieState] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title,
    imgUrl,
    imdbUrl,
    imdbId,
  } = movieState;

  const allRequiredFields = !(
    title.trim()
    && imgUrl.trim()
    && imdbUrl.trim()
    && imdbId.trim());

  const resetMovieState = () => {
    setMovieState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onAdd(movieState);
    setCount(prevCount => prevCount + 1);
    resetMovieState();
  };

  const handleInputChange = (name: string, value: string) => {
    setMovieState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieState.title}
        onChange={(value) => handleInputChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieState.description}
        onChange={(value) => handleInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieState.imgUrl}
        onChange={(value) => handleInputChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieState.imdbUrl}
        onChange={(value) => handleInputChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieState.imdbId}
        onChange={(value) => handleInputChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleSubmit}
            disabled={allRequiredFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
