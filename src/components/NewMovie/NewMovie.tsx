import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const reset = () => {
    setCount(prev => prev + 1);
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = newMovie;

  const handleAddField = (newValue: string, fieldtitle: string) => {
    setNewMovie({ ...newMovie, [fieldtitle]: newValue });
  };

  const isdisabled = (!!title && !!imgUrl && !!imdbUrl && !!imdbId);

  return (
    <form
      className="NewMovie"
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        required
        onAddField={handleAddField}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onAddField={handleAddField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onAddField={handleAddField}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onAddField={handleAddField}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onAddField={handleAddField}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={event => {
              event.preventDefault();
              onAdd(newMovie);
              reset();
            }}
            disabled={!isdisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
