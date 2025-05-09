import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const urlPattern = new RegExp(
    '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
      '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)' +
      '((?:\\/[+~%/\\.\\w-_]*)?\\??(?:[-+=&;%@,\\.\\w_]*)#?' +
      '(?:[,.!/\\\\\\w]*))?)$',
  );

  const handleAddMovie = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(newMovie);
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <form className="NewMovie" key={formKey}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => setNewMovie({ ...newMovie, title: value })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => setNewMovie({ ...newMovie, description: value })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={value => setNewMovie({ ...newMovie, imgUrl: value })}
        required
        validate={value =>
          urlPattern.test(value.trim()) ? null : 'Must be a valid URL'
        }
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={value => setNewMovie({ ...newMovie, imdbUrl: value })}
        required
        validate={value =>
          urlPattern.test(value.trim()) ? null : 'Must be a valid URL'
        }
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={value => setNewMovie({ ...newMovie, imdbId: value })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleAddMovie}
            disabled={
              !newMovie.title.trim() ||
              !newMovie.imgUrl.trim() ||
              !urlPattern.test(newMovie.imgUrl.trim()) ||
              !newMovie.imdbUrl.trim() ||
              !urlPattern.test(newMovie.imdbUrl.trim()) ||
              !newMovie.imdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
