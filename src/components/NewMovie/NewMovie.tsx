import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { getPatternCorect } from '../../services/pattern';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd: getPreparedMovies }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const reset = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    getPreparedMovies(newMovie);

    setCount(count + 1);

    reset();
  };

  const handleChange = (field: string, value: string) => {
    setNewMovie({
      ...newMovie,
      [field]: value,
    });
  };

  const disabledButton =
    !newMovie.title ||
    !getPatternCorect(newMovie.imgUrl) ||
    !getPatternCorect(newMovie.imdbUrl) ||
    !newMovie.imdbId;

  return (
    <form className="NewMovie" key={count} onSubmit={handleAdd}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => handleChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => handleChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => handleChange('imgUrl', value)}
        required
        patternCorect={getPatternCorect(newMovie.imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => handleChange('imdbUrl', value)}
        required
        patternCorect={getPatternCorect(newMovie.imdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => handleChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
