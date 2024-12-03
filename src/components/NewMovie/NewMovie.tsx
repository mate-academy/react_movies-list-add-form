import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface OnAdd {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<OnAdd> = props => {
  const { onAdd } = props;
  const [count, setCount] = useState(0);
  const [desc, setDesc] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [title, setTitle] = useState('');

  const onReset = () => {
    setDesc('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setTitle('');
  };

  const validFields = imgUrl && imdbUrl && imdbId && title;

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validFields) {
      const moviesForms = {
        description: desc,
        imgUrl: imgUrl,
        imdbUrl: imdbUrl,
        imdbId: imdbId,
        title: title,
      };

      onAdd(moviesForms);
      setCount(prevCount => prevCount + 1);
      onReset();
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={formSubmit}>
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
