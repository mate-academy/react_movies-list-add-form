import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const defautlMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [newMovie, setNewMovie] = useState(defautlMovie);

  const isDisabled =
    !newMovie.title ||
    !newMovie.imdbUrl ||
    !newMovie.imgUrl ||
    !newMovie.imdbId;

  const [count, setCount] = useState(0);

  const reset = () => {
    setCount(current => current + 1);
    setNewMovie(defautlMovie);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovie);

    reset();
  };

  const handleFieldChange = (fieldName: string, value: string) => {
    setNewMovie(prevMovie => ({
      ...prevMovie,
      [fieldName]: value,
    }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        newName="title"
        label="Title"
        newValue={newMovie.title.trim()}
        onChange={(name: string, value: string) =>
          handleFieldChange(name, value)
        }
        required
      />

      <TextField
        newName="description"
        label="Description"
        newValue={newMovie.description.trim()}
        onChange={(name: string, value: string) =>
          handleFieldChange(name, value)
        }
      />

      <TextField
        newName="imgUrl"
        label="Image URL"
        newValue={newMovie.imgUrl.trim()}
        onChange={(name: string, value: string) =>
          handleFieldChange(name, value)
        }
        required
      />

      <TextField
        newName="imdbUrl"
        label="Imdb URL"
        newValue={newMovie.imdbUrl.trim()}
        onChange={(name: string, value: string) =>
          handleFieldChange(name, value)
        }
        required
      />

      <TextField
        newName="imdbId"
        label="Imdb ID"
        newValue={newMovie.imdbId.trim()}
        onChange={(name: string, value: string) =>
          handleFieldChange(name, value)
        }
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
