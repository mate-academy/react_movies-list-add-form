import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onSubmit: (post: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onSubmit }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const isButtonDisabled
  = !newMovie.title.trim()
  || !newMovie.imgUrl.trim()
  || !newMovie.imdbUrl.trim()
  || !newMovie.imdbId.trim();

  const handleInputChange = (name: string, value: string) => {
    setNewMovie(prevMovie => ({ ...prevMovie, [name]: value }));
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(newMovie);

    setCount(count + 1);

    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
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
        value={newMovie.title}
        onChange={(newValue) => handleInputChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={(newValue) => handleInputChange('description', newValue)}
        required
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={(newValue) => handleInputChange('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={(newValue) => handleInputChange('imdbUrl', newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={(newValue) => handleInputChange('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
