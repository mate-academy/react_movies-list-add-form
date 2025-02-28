import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { initialData, pattern, requiredFields } from './NewMovie.utils';

type NewMovieProps = {
  onAdd: (data: Movie) => void;
};

export const NewMovie: FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [movieData, setMovieData] = useState<Movie>(initialData);

  const [movieDataErrors, setMovieDataErrors] = useState<Partial<Movie>>({});

  const hasErrors = () => Object.values(movieDataErrors).length > 0;
  const getIsAllFilled = () =>
    requiredFields.map(item => movieData[item]).filter(Boolean).length ==
    requiredFields.length;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasErrors()) {
      onAdd(movieData);
      setMovieData(initialData);
      setCount(count + 1);
      setMovieDataErrors({});
    }
  };

  const handleChange = (name: string) => {
    return (value: string) => {
      setMovieData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    };
  };

  const validateField = (
    name: keyof Movie,
    value: string,
    description: string,
    required: boolean = false,
  ) => {
    if (required && !value) {
      setMovieDataErrors(prev => ({
        ...prev,
        [name]: `${description} is required`,
      }));

      return;
    }

    if (['imgUrl', 'imdbUrl'].includes(name) && !pattern.test(value)) {
      setMovieDataErrors(prev => ({
        ...prev,
        [name]: 'Not Valid URL',
      }));

      return;
    }

    setMovieDataErrors(prev => {
      const newData = { ...prev };

      delete newData[name];

      return newData;
    });
  };

  const handleBlur = (
    name: keyof Movie,
    description: string,
    required?: boolean,
  ) => {
    return (event: React.FocusEvent<HTMLInputElement, Element>) => {
      const { value } = event.target;

      validateField(name, value, description, required);
    };
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieData.title}
        onChange={handleChange('title')}
        required
        handleBlur={handleBlur('title', 'Title', true)}
        error={movieDataErrors?.title}
      />

      <TextField
        name="description"
        label="Description"
        value={movieData.description}
        onChange={handleChange('description')}
        handleBlur={handleBlur('description', 'Description')}
        error={movieDataErrors.description}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieData.imgUrl}
        onChange={handleChange('imgUrl')}
        required
        handleBlur={handleBlur('imgUrl', 'Image URL', true)}
        error={movieDataErrors.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieData.imdbUrl}
        onChange={handleChange('imdbUrl')}
        required
        handleBlur={handleBlur('imdbUrl', 'Imdb URL', true)}
        error={movieDataErrors.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieData.imdbId}
        onChange={handleChange('imdbId')}
        required
        handleBlur={handleBlur('imdbId', 'Imdb ID', true)}
        error={movieDataErrors.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasErrors() || !getIsAllFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
