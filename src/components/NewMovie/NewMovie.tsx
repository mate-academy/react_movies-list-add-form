import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie = ({ onAdd }: { onAdd: (newMovie: Movie) => void }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [resetTouched, setResetTouched] = useState(false);

  const newMovie: Movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const isAnyRequiredFieldEmpty =
    title == '' || imgUrl == '' || imdbUrl == '' || imdbId == '';

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setResetTouched(true);
  };

  return (
    <form
      className="NewMovie"
      onSubmit={event => {
        event.preventDefault();
        onAdd(newMovie);
        resetForm();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue => setTitle(newValue)}
        required
        resetTouched={resetTouched}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => setDescription(newValue)}
        resetTouched={resetTouched}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newValue => setImgUrl(newValue)}
        required
        resetTouched={resetTouched}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newValue => setImdbUrl(newValue)}
        required
        resetTouched={resetTouched}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newValue => setImdbId(newValue)}
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
