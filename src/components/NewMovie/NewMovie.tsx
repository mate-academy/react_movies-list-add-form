import { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

// export const NewMovie = () => {
interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // const handleBlur = (e: React.FocusEvent<HTMLInputElement> | null) => {
  //   if (!e || !e.target || !e.target.name || !e.target.value) {
  //     return;
  //   }

  //   const { name, value } = e.target;

  //   if (!value.trim()) {
  //     setErrors({ ...errors, [name]: 'This field is required' });
  //   } else {
  //     setErrors({ ...errors, [name]: '' });
  //   }
  // };

  // const validateForm = () => {
  //   const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];

  //   const isValid = requiredFields.every(
  //     field =>
  //       Object.keys(movie).includes(field) &&
  //       movie[field as keyof Movie].trim() !== '',
  //   );

  //   setIsFormValid(isValid);
  // };

  // useEffect(() => {
  //   validateForm();
  // }, [movie]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement> | null) => {
    if (e === null) {
      return;
    }

    if (!e.target || !e.target.name || !e.target.value) {
      return;
    }

    const { name, value } = e.target;

    if (!value.trim()) {
      setErrors({ ...errors, [name]: 'This field is required' });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = useCallback(() => {
    const requiredFields = ['title', 'imgUrl', 'imdbUrl', 'imdbId'];
    const isValid = requiredFields.every(
      field =>
        Object.keys(movie).includes(field) &&
        movie[field as keyof Movie].trim() !== '',
    );

    setIsFormValid(isValid);
  }, [movie]);

  useEffect(() => {
    validateForm();
  }, [movie, validateForm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      // Додати фільм
      onAdd(movie); // Виклик функції onAdd з об'єктом movie

      // Очистити форму
      setMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      setErrors({});
    }
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => setMovie({ ...movie, title: value })}
        onBlur={handleBlur}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => setMovie({ ...movie, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => setMovie({ ...movie, imgUrl: value })}
        onBlur={handleBlur}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => setMovie({ ...movie, imdbUrl: value })}
        onBlur={handleBlur}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => setMovie({ ...movie, imdbId: value })}
        onBlur={handleBlur}
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
