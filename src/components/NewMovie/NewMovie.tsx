import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface OnAdd {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<OnAdd> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const Reset = () => {
    setDesc('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setTitle('');
  };

  const validFields =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim()
      ? true
      : false;

  const formHandle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validFields) {
      const moviesForms = {
        description: desc,
        imgUrl: imgUrl.trim(),
        imdbUrl: imdbUrl.trim(),
        imdbId: imdbId.trim(),
        title: title.trim(),
      };

      setCount(prevCount => prevCount + 1);
      onAdd(moviesForms);
      Reset();
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={formHandle}>
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
        value={desc}
        onChange={setDesc}
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
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!validFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
