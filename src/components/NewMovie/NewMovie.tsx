import { useState, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie, IsMovie } from '../../types/Movie';

interface Props {
  newMovie: Movie,
  touchedMovies: IsMovie,
  setNewMovie: (newValue: Movie) => void,
  setTouchedMovies: (newValue: IsMovie) => void,
  valueDelete: () => void,
  addOn: () => void,
  isButtonDisabled: boolean,
}

export const NewMovie: React.FC<Props> = ({
  newMovie,
  touchedMovies,
  setTouchedMovies,
  addOn,
  setNewMovie,
  valueDelete,
  isButtonDisabled,
}) => {
  const [count] = useState(0);
  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const addMovieComponent = (event: string, secondValue: string) => {
    const key = secondValue;
    const updatedObjectTitle = { ...newMovie, [key]: event.trim() };

    setNewMovie(updatedObjectTitle);
  };

  const addTouchedComponent = (event: boolean, componentName: string) => {
    const compKey = componentName;
    const updatedObjectDescription = { ...touchedMovies, [compKey]: event };

    setTouchedMovies(updatedObjectDescription);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      {}

      <TextField
        name="title"
        label="Title"
        required
        value={title}
        onChange={(event, secondValue) => {
          addMovieComponent(event, secondValue);
        }}
        onDisabledChange={(event, componentName) => {
          addTouchedComponent(event, componentName);
        }}
        touchedMovies={touchedMovies}
      />

      <TextField
        name="description"
        label="Description"
        required
        value={description}
        onChange={(event, secondValue) => {
          addMovieComponent(event, secondValue);
        }}
        onDisabledChange={(event, componentName) => {
          addTouchedComponent(event, componentName);
        }}
        touchedMovies={touchedMovies}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        value={imgUrl}
        onChange={(event, secondValue) => {
          addMovieComponent(event, secondValue);
        }}
        onDisabledChange={(event, componentName) => {
          addTouchedComponent(event, componentName);
        }}
        touchedMovies={touchedMovies}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={imdbUrl}
        onChange={(event, secondValue) => {
          addMovieComponent(event, secondValue);
        }}
        onDisabledChange={(event, componentName) => {
          addTouchedComponent(event, componentName);
        }}
        touchedMovies={touchedMovies}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={imdbId}
        onChange={(event, secondValue) => {
          addMovieComponent(event, secondValue);
        }}
        onDisabledChange={(event, componentName) => {
          addTouchedComponent(event, componentName);
        }}
        touchedMovies={touchedMovies}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isButtonDisabled}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={() => {
              addOn();
              valueDelete();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
