import { useState } from 'react';
import { TextField } from '../TextField';

type NewMovieData = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type NewMovieProps = {
  onAdd: (movieData: NewMovieData) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [movie, setMovie] = useState<NewMovieData>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (fieldName: keyof NewMovieData, value: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      [fieldName]: value,
    }));
  };

  const [count, setCount] = useState(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(movie);

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(prevCount => prevCount + 1);
  };

  const requiredFields: Array<keyof NewMovieData> = [
    'title',
    'imgUrl',
    'imdbUrl',
    'imdbId',
  ];

  const isFormValid = () => {
    return requiredFields.every(field => {
      const value = movie[field];

      return value.trim().length > 0;
    });
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={value => handleChange('title', value)}
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
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={value => handleChange('imdbId', value)}
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
