import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (post: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const isDisabled =
    !newMovie.title.trim() ||
    !newMovie.imgUrl.trim() ||
    !newMovie.imdbUrl.trim() ||
    !newMovie.imdbId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    onAdd(newMovie);

    setCount(prev => prev + 1);
  };

  const handleChange = (newValue: string, name: string) => {
    setNewMovie(current => ({
      ...current,
      [name]: newValue,
    }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => handleChange(value, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => handleChange(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => handleChange(value, 'imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => handleChange(value, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => handleChange(value, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
