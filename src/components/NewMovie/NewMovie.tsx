import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
// import { MovieCard } from '../MovieCard';

type Add = (movie: Movie) => void;

export const NewMovie = ({ onAdd } : { onAdd: Add }) => {
  const [count, setCount] = useState(0);
  const [moveiState, setMovieState] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const {
    title, imgUrl, imdbUrl, imdbId,
  } = moveiState;
  const allRequiredFiels = !(title && imgUrl && imdbUrl && imdbId);

  const resetMovieState = () => {
    setMovieState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handlerSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onAdd(moveiState);
    setCount(prevCount => prevCount + 1);
    resetMovieState();
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={moveiState.title}
        onChange={(value) => {
          setMovieState(prevState => ({
            ...prevState,
            title: value,
          }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={moveiState.description}
        onChange={(value) => {
          setMovieState(prevState => ({
            ...prevState,
            description: value,
          }));
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={moveiState.imgUrl}
        onChange={(value) => {
          setMovieState(prevState => ({
            ...prevState,
            imgUrl: value,
          }));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={moveiState.imdbUrl}
        onChange={(value) => {
          setMovieState(prevState => ({
            ...prevState,
            imdbUrl: value,
          }));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={moveiState.imdbId}
        onChange={(value) => {
          setMovieState(prevState => ({
            ...prevState,
            imdbId: value,
          }));
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handlerSubmit}
            disabled={allRequiredFiels}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
