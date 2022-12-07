import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie = (props: Props) => {
  const { onAdd } = props;

  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const clearMovieStates = () => {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const movie = {
    title,
    description,
    imgUrl: imageUrl,
    imdbUrl,
    imdbId,
  };

  const areFieldsFilled = () => !(title && imageUrl && imdbUrl && imdbId);
  const handleMovieEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(movie);
    setCount(count + 1);
    clearMovieStates();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleMovieEvent}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrl}
        onChange={(imgUrlData) => setImageUrl(imgUrlData)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(imdbUrlData) => setImdbUrl(imdbUrlData)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(imdbIdData) => setImdbId(imdbIdData)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={areFieldsFilled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
