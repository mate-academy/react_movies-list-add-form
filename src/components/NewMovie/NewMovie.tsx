import React, { useState, useEffect } from 'react';
import { TextField } from '../TextField';
import { Movie, Errors } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [movieData, setMovieData] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState<Errors>({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const [touched, setTouched] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const [count, setCount] = useState(0); // State to trigger form reset

  const handleChange = (fieldName: string, value: string) => {
    setMovieData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid = movieData.title.trim() !== ''
                   && movieData.imgUrl.trim() !== ''
                   && movieData.imdbUrl.trim() !== ''
                   && movieData.imdbId.trim() !== '';

    setIsFormValid(isValid);
  }, [movieData]);

  const handleBlur = (fieldName: string) => {
    setTouched({ ...touched, [fieldName]: true });
    setErrors({ ...errors, [fieldName]: !movieData[fieldName].trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        onAdd(movieData);

        setMovieData({
          title: '',
          description: '',
          imgUrl: '',
          imdbUrl: '',
          imdbId: '',
        });
        setCount(prevCount => prevCount + 1);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error submitting form:', error);
      }
    }
  };

  // const validateForm = () => {
  //   setIsFormValid(movieData.title.trim() !== '');
  // };

  // useEffect(() => {
  //   validateForm();
  // });

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieData.title}
        onChange={(newValue) => handleChange('title', newValue)}
        onBlur={() => handleBlur('title')}
        required
        error={touched.title && errors.title}
        data-cy="movie-title"
      />

      <TextField
        name="description"
        value={movieData.description}
        onChange={(newValue) => handleChange('description', newValue)}
        data-cy="movie-description"
      />

      <TextField
        name="imgUrl"
        value={movieData.imgUrl}
        onChange={(newValue) => handleChange('imgUrl', newValue)}
        onBlur={() => handleBlur('imgUrl')}
        required
        error={touched.imgUrl && errors.imgUrl}
        data-cy="movie-imgUrl"
      />

      <TextField
        name="imdbUrl"
        value={movieData.imdbUrl}
        onChange={(newValue) => handleChange('imdbUrl', newValue)}
        onBlur={() => handleBlur('imdbUrl')}
        required
        error={touched.imdbUrl && errors.imdbUrl}
        data-cy="movie-imdbUrl"
      />

      <TextField
        name="imdbId"
        value={movieData.imdbId}
        onChange={(newValue) => handleChange('imdbId', newValue)}
        onBlur={() => handleBlur('imdbId')}
        required
        error={touched.imdbId && errors.imdbId}
        data-cy="movie-imdbId"
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
