import { useState } from 'react';
import { TextField } from '../TextField';
import { MovieField } from '../../constants/MovieField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd: onAddMovie = () => {} }) => {
  const [movieData, setMovieData] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [formKey, setFormKey] = useState(0);

  const handleChange = (field: keyof Movie) => (value: string) => {
    setMovieData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAddMovie({ ...movieData });

    setMovieData({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setFormKey(prev => prev + 1);
  };

  const isFormValid =
    movieData[MovieField.IMDB_ID].trim() &&
    movieData[MovieField.IMDB_URL].trim() &&
    movieData[MovieField.IMG_URL].trim() &&
    movieData[MovieField.TITLE].trim();

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieData.title}
        onChange={handleChange(MovieField.TITLE)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieData.description}
        onChange={handleChange(MovieField.DESCRIPTION)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieData.imgUrl}
        onChange={handleChange(MovieField.IMG_URL)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieData.imdbUrl}
        onChange={handleChange(MovieField.IMDB_URL)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieData.imdbId}
        onChange={handleChange(MovieField.IMDB_ID)}
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
