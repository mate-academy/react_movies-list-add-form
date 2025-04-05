import { useState } from 'react';
import { TextField } from '../TextField';

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
}

export const NewMovie = ({ onAdd }: { onAdd: (movie: Movie) => void }) => {
  const [movie, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [count, setCount] = useState(0);

  const handleChange = (name: keyof typeof movie, value: string) => {
    setMovie(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error when editing
  };

  const handleBlur = (name: keyof typeof movie) => {
    if (!movie[name].trim()) {
      setErrors(prev => ({ ...prev, [name]: 'This field is required.' }));
    }
  };

  const isFormValid = () => {
    return (
      movie.title.trim() &&
      movie.imgUrl.trim() &&
      movie.imdbUrl.trim() &&
      movie.imdbId.trim() &&
      Object.values(errors).every(error => !error)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields: (keyof typeof movie)[] = [
      'title',
      'imgUrl',
      'imdbUrl',
      'imdbId',
    ];
    const newErrors: Record<string, string> = {};

    requiredFields.forEach(field => {
      if (!movie[field].trim()) {
        newErrors[field] = 'This field is required.';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    onAdd(movie); // Pass new movie to parent handler

    // Reset the form
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setErrors({});
    setCount(prev => prev + 1); // Reset touched states
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => handleChange('title', value)}
        onBlur={() => handleBlur('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        onBlur={() => handleBlur('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={movie.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        onBlur={() => handleBlur('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={movie.imdbId}
        onChange={value => handleChange('imdbId', value)}
        onBlur={() => handleBlur('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
