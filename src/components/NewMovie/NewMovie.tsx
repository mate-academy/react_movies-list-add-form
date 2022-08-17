import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const movie = () => ({
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  });

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
        onChange={setImdbUrl}
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
            id="submit"
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              title === ''
              || imgUrl === ''
              || imdbUrl === ''
              || imdbId === ''
            }
            onClick={(event) => {
              event.preventDefault();
              onAdd(movie());
              setCount(count + 1);
              setTitle('');
              setDescription('');
              setImgUrl('');
              setImdbUrl('');
              setImdbId('');
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
