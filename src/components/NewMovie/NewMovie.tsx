import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type AddMovieProps = {
  onAdd: (movie: Movie) => void;
};
export const NewMovie: React.FC<AddMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s

  const [addTitle, setAddTitle] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addImgUrl, setAddImgUrl] = useState('');
  const [addImdbUrl, setaddImdbUrl] = useState('');
  const [imdbId, setimdbId] = useState('');

  const [count, setCount] = useState(0);

  const resetForm = () => {
    setAddTitle('');
    setAddDescription('');
    setAddImgUrl('');
    setaddImdbUrl('');
    setimdbId('');
  };

  const handleMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(currentCount => currentCount + 1);
    if (
      addTitle.trim() &&
      addImgUrl.trim() &&
      addImdbUrl.trim() &&
      imdbId.trim()
    ) {
      const newMovie: Movie = {
        title: addTitle.trim(),
        description: addDescription.trim(),
        imgUrl: addImgUrl.trim(),
        imdbUrl: addImdbUrl.trim(),
        imdbId: imdbId.trim(),
      };

      if (onAdd) {
        onAdd(newMovie);
      }

      resetForm();
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={addTitle}
        onChange={event => setAddTitle(event)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={addDescription}
        onChange={event => setAddDescription(event)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={addImgUrl}
        onChange={event => setAddImgUrl(event)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={addImdbUrl}
        onChange={event => setaddImdbUrl(event)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={`${imdbId}`}
        onChange={event => setimdbId(event)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!(addTitle && addImgUrl && addImdbUrl && imdbId)}
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
