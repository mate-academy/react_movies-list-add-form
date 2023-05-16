import { useState, FormEvent } from 'react';
import { TextField } from '../TextField';
import { Movie, IsMovie } from '../../types/Movie';

interface Props {
  newMovie: Movie,
  touchedMovies: IsMovie,
  setNewMovie: (newValue: Movie) => void,
  setTouchedMovies: (newValue: IsMovie) => void,
  addOn: () => void,
  isButtonDisabled: boolean,
}

export const NewMovie: React.FC<Props> = ({
  newMovie,
  touchedMovies,
  setTouchedMovies,
  addOn,
  setNewMovie,
  isButtonDisabled,
}) => {
  const [count] = useState(0);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
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
        value={newMovie.title}
        required
        onChange={(event) => {
          const updatedObjectTitle = { ...newMovie, title: event };

          setNewMovie(updatedObjectTitle);
        }}
        onDisabledChange={(event) => {
          const updatedObjectTitle
           = { ...touchedMovies, title: event };

          setTouchedMovies(updatedObjectTitle);
        }}
        touchedMovies={touchedMovies}
      />

      <TextField
        name="description"
        label="Description"
        required
        value={newMovie.description}
        onChange={(event) => {
          const updatedObjectDescription = { ...newMovie, description: event };

          setNewMovie(updatedObjectDescription);
        }}
        onDisabledChange={(event) => {
          const updatedObjectDescription
           = { ...touchedMovies, description: event };

          setTouchedMovies(updatedObjectDescription);
        }}
        touchedMovies={touchedMovies}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        required
        onChange={(event) => {
          const updatedObjectImgUrl = { ...newMovie, imgUrl: event };

          setNewMovie(updatedObjectImgUrl);
        }}
        onDisabledChange={(event) => {
          const updatedObjectimgUrl
           = { ...touchedMovies, imgUrl: event };

          setTouchedMovies(updatedObjectimgUrl);
        }}
        touchedMovies={touchedMovies}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        required
        onChange={(event) => {
          const updatedObjectImdUrl = { ...newMovie, imdbUrl: event };

          setNewMovie(updatedObjectImdUrl);
        }}
        onDisabledChange={(event) => {
          const updatedObjectimdbUrl
           = { ...touchedMovies, imdbUrl: event };

          setTouchedMovies(updatedObjectimdbUrl);
        }}
        touchedMovies={touchedMovies}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        required
        onChange={(event) => {
          const updatedObjectImdbId = { ...newMovie, imdbId: event };

          setNewMovie(updatedObjectImdbId);
        }}
        onDisabledChange={(event) => {
          const updatedObjectimdbId
           = { ...touchedMovies, imdbId: event };

          setTouchedMovies(updatedObjectimdbId);
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
            onClick={addOn}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
