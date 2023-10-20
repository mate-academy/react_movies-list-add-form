import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [createdMovie, setCreatedMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (createdMovie.title.trim() === '') {
      newErrors.title = 'Title is required';
    }

    if (createdMovie.imgUrl.trim() === '') {
      newErrors.imgUrl = 'Image URL is required';
    }

    if (createdMovie.imdbUrl.trim() === '') {
      newErrors.imdbUrl = 'IMDb URL is required';
    }

    if (createdMovie.imdbId.trim() === '') {
      newErrors.imdbId = 'IMDb ID is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setCreatedMovie({ ...createdMovie, [field]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      onAdd(createdMovie);
      setCreatedMovie({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      setCount(count + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={createdMovie.title}
        onChange={(value) => handleInputChange('title', value)}
        onBlur={() => validateForm()}
        error={errors.title}
        isRequired
      />

      <TextField
        name="description"
        label="Description"
        value={createdMovie.description}
        onChange={(value) => handleInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={createdMovie.imgUrl}
        onChange={(value) => handleInputChange('imgUrl', value)}
        onBlur={() => validateForm()}
        error={errors.imgUrl}
        isRequired
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={createdMovie.imdbUrl}
        onChange={(value) => handleInputChange('imdbUrl', value)}
        onBlur={() => validateForm()}
        error={errors.imdbUrl}
        isRequired
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={createdMovie.imdbId}
        onChange={(value) => handleInputChange('imdbId', value)}
        onBlur={() => validateForm()}
        error={errors.imdbId}
        isRequired
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!createdMovie.title
              || !createdMovie.imgUrl
              || !createdMovie.imdbUrl
              || !createdMovie.imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
