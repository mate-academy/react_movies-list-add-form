import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie = ({ onAdd }: { onAdd: (newMovie: Movie) => void }) => {
  const [newMovie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [resetTouched, setResetTouched] = useState(false);

  const isAnyRequiredFieldEmpty =
    newMovie.title.trim() == '' ||
    newMovie.imgUrl.trim() == '' ||
    newMovie.imdbUrl.trim() == '' ||
    newMovie.imdbId.trim() == '';

  const resetForm = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const onChange = (field: keyof Movie) => (value: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      [field]: value,
    }));
  };

  return (
    <form
      className="NewMovie"
      onSubmit={event => {
        event.preventDefault();
        onAdd(newMovie);
        resetForm();
        setResetTouched(true);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={onChange('title')}
        required
        resetTouched={resetTouched}
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={onChange('description')}
        resetTouched={resetTouched}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={onChange('imgUrl')}
        required
        resetTouched={resetTouched}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={onChange('imdbUrl')}
        required
        resetTouched={resetTouched}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={onChange('imdbId')}
        required
        resetTouched={resetTouched}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isAnyRequiredFieldEmpty}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
