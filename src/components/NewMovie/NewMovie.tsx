import { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

function checkOnlySpaces(movieTitle: string): boolean {
  return /^\s*$/.test(movieTitle);
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleFormReset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setimdbUrl('');
    setImdbId('');
  };

  const handleMovieAddition = (event: FormEvent) => {
    event.preventDefault();
    onAdd({
      title, description, imgUrl, imdbUrl, imdbId,
    });
    setCount(prevCount => prevCount + 1);

    handleFormReset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleMovieAddition}
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
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setimdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={
              !(title && imgUrl && imdbId && imdbUrl) || checkOnlySpaces(title)
            }
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
