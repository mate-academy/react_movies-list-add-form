import React, { useCallback, useMemo, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movieData: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieData, setMovieData] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = useCallback((name: string, value: string) => {
    setMovieData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleValidationChange = useCallback(
    (fieldName: string, hasError: boolean) => {
      setValidationErrors(prevErrors => ({
        ...prevErrors,
        [fieldName]: hasError,
      }));
    },
    [],
  );

  const isFormValid = useMemo(() => {
    const { title, imgUrl, imdbUrl, imdbId } = movieData;
    const areRequiredFields =
      title.trim().length > 0 &&
      imgUrl.trim().length > 0 &&
      imdbUrl.trim().length > 0 &&
      imdbId.trim().length > 0;
    const hasValidationError = Object.values(validationErrors).some(
      error => error === true,
    );

    return areRequiredFields && !hasValidationError;
  }, [movieData, validationErrors]);

  const clearForm = useCallback(() => {
    setMovieData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setValidationErrors({});
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (!isFormValid) {
        return;
      }

      setCount(prevCount => prevCount + 1);
      onAdd(movieData);
      clearForm();
    },
    [clearForm, isFormValid, movieData, onAdd],
  );

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieData.title}
        onChange={value => handleChange('title', value)}
        onValidationChange={handleValidationChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieData.description}
        onChange={value => handleChange('description', value)}
        onValidationChange={handleValidationChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieData.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        isUrlField={true}
        onValidationChange={handleValidationChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieData.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        isUrlField={true}
        onValidationChange={handleValidationChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieData.imdbId}
        onChange={value => handleChange('imdbId', value)}
        onValidationChange={handleValidationChange}
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
