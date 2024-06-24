import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type AddMovieProps = {
  onAdd: (movie: Movie) => void;
};
export const NewMovie: React.FC<AddMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const [newMovies, setNewMovies] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [count, setCount] = useState(0);

  const resetForm = () => {
    setNewMovies({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleChange = (name: string, value: string) => {
    setNewMovies(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      newMovies.title.trim() &&
      newMovies.imgUrl.trim() &&
      newMovies.imdbUrl.trim() &&
      newMovies.imdbId.trim()
    ) {
      const newMovie: Movie = {
        title: newMovies.title.trim(),
        description: newMovies.description.trim(),
        imgUrl: newMovies.imgUrl.trim(),
        imdbUrl: newMovies.imdbUrl.trim(),
        imdbId: newMovies.imdbId.trim(),
      };

      if (onAdd) {
        onAdd(newMovie);
      }

      resetForm();
      setCount(currentCount => currentCount + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovies.title}
        onChange={(newValue: string) => handleChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovies.description}
        onChange={(newValue: string) => handleChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovies.imgUrl}
        onChange={(newValue: string) => handleChange('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovies.imdbUrl}
        onChange={(newValue: string) => handleChange('imdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={`${newMovies.imdbId}`}
        onChange={(newValue: string) => handleChange('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={
              !(
                newMovies.title &&
                newMovies.imgUrl &&
                newMovies.imdbUrl &&
                newMovies.imdbId
              )
            }
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
