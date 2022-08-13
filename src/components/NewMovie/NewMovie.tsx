import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../../api/pattern';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const emptyField = () => {
    if (title !== '' && imgUrl !== '' && imdbUrl !== '' && imdbId !== ''
      && imdbUrl.match(pattern) && imgUrl.match(pattern)) {
      return false;
    }

    return true;
  };

  const newMovie = () => {
    return {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(prevCount => prevCount + 1);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue) => setTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue) => setDescription(newValue)}
        required={false}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue) => setImgUrl(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue) => setImdbUrl(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue) => setImdbId(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={emptyField()}
            onClick={(event) => {
              event.preventDefault();
              onAdd(newMovie());
              clearForm();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
