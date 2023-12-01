import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const validateForm = () => {
    const isValid = ['title', 'imgUrl', 'imdbUrl', 'imdbId'].every(
      (field) => movie[field].trim() !== '',
    );

    setSubmitDisabled(!isValid);
  };

  const handleChange = (name: keyof Movie, value: string) => {
    setMovie({
      ...movie,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: false,
    });

    validateForm();
  };

  const handBlur = (name: keyof Movie) => {
    setErrors({
      ...errors,
      [name]: movie[name] === '' || name !== 'description',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const requiredFields: Array<keyof Movie> = [
      'title', 'imgUrl', 'imdbUrl', 'imdbId'];
    const hasErrors = requiredFields.some((field) => movie[field] === '');

    if (hasErrors) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: movie.title === '',
        imgUrl: movie.imgUrl === '',
        imdbUrl: movie.imdbUrl === '',
        imdbId: movie.imdbId === '',
      }));

      return;
    }

    onAdd({
      title: movie.title,
      description: movie.description,
      imgUrl: movie.imgUrl,
      imdbUrl: movie.imdbUrl,
      imdbId: movie.imdbId,
    });

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setSubmitDisabled(true);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={(value) => handleChange('title', value)}
        onBlur={() => handBlur('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={(value) => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={(value) => handleChange('imgUrl', value)}
        onBlur={() => handBlur('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={(value) => handleChange('imdbUrl', value)}
        onBlur={() => handBlur('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={(value) => handleChange('imdbId', value)}
        onBlur={() => handBlur('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={submitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
