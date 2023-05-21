import { useState, FormEvent, useEffect } from 'react';
import { TextField } from '../TextField';
import { Movie, RequiredMovieFields } from '../../types/Movie';

interface Props {
  newMovie: Movie,
  touchedMovies: RequiredMovieFields,
  setNewMovie: (newValue: Movie) => void,
  setTouchedMovies:
  (newValue: RequiredMovieFields | ((prevTouchedMovies: RequiredMovieFields)
  => RequiredMovieFields)) => void,
  valueDelete: () => void,
  handleMovieAdd: () => void,
  isButtonDisabled: boolean,
}

export const NewMovie: React.FC<Props> = ({
  newMovie,
  touchedMovies,
  setTouchedMovies,
  handleMovieAdd,
  setNewMovie,
  valueDelete,
  isButtonDisabled,
}) => {
  const [count] = useState(0);
  const [hasError, setHasError] = useState(false);
  const {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  } = newMovie;

  type MovieKey = keyof RequiredMovieFields;

  type TouchedKeys = {
    [key in MovieKey]: boolean;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const requiredFields: MovieKey[] = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];
    let hasAnError = true;

    requiredFields.forEach((field) => {
      if (!newMovie[field as keyof RequiredMovieFields]) {
        setTouchedMovies((prevTouchedMovies) => ({
          ...prevTouchedMovies,
          [field]: false,
        }));
        hasAnError = false;
      }
    });

    if (!hasAnError) {
      handleMovieAdd();
      valueDelete();
    }
  };

  const addMovieComponent = (event: string, movieName: string) => {
    const key = movieName;
    const updatedObjectTitle = { ...newMovie, [key]: event };

    setNewMovie(updatedObjectTitle);
  };

  const addTouchedComponent = (
    event: boolean,
    componentName: string,
    isRequired: boolean,
  ) => {
    const compKey = componentName;
    const updatedObjectDescription = { ...touchedMovies, [compKey]: event };
    const zeroValue = newMovie[compKey as keyof RequiredMovieFields];

    setTouchedMovies(updatedObjectDescription);

    if (!zeroValue.length
      && isRequired) {
      setHasError(true);
    }
  };

  useEffect(() => {
    const properties: MovieKey[]
     = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];
    const update: TouchedKeys = { ...touchedMovies };

    properties.forEach((property) => {
      if (newMovie[property].length > 0) {
        update[property] = false;
      }
    });

    setTouchedMovies(update);
  }, [newMovie]);

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
        onChange={(event, movieName) => {
          addMovieComponent(event, movieName);
        }}
        onDisabledChange={(event, componentName, isRequired) => {
          addTouchedComponent(event, componentName, isRequired);
        }}
        touchedMovies={touchedMovies}
        hasError={hasError}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event, movieName) => {
          addMovieComponent(event, movieName);
        }}
        onDisabledChange={(event, componentName, isRequired) => {
          addTouchedComponent(event, componentName, isRequired);
        }}
        touchedMovies={touchedMovies}
        hasError={hasError}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        value={imgUrl}
        onChange={(event, movieName) => {
          addMovieComponent(event, movieName);
        }}
        onDisabledChange={(event, componentName, isRequired) => {
          addTouchedComponent(event, componentName, isRequired);
        }}
        touchedMovies={touchedMovies}
        hasError={hasError}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={imdbUrl}
        onChange={(event, movieName) => {
          addMovieComponent(event, movieName);
        }}
        onDisabledChange={(event, componentName, isRequired) => {
          addTouchedComponent(event, componentName, isRequired);
        }}
        touchedMovies={touchedMovies}
        hasError={hasError}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={imdbId}
        onChange={(event, movieName) => {
          addMovieComponent(event, movieName);
        }}
        onDisabledChange={(event, componentName, isRequired) => {
          addTouchedComponent(event, componentName, isRequired);
        }}
        touchedMovies={touchedMovies}
        hasError={hasError}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isButtonDisabled}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={() => {
              handleMovieAdd();
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
