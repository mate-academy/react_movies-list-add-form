import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescrption] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(num => num + 1);

    setTitle('');
    setDescrption('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={e => {
          setTitle(e);
        }}
        required={count === 0}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={e => {
          setDescrption(e);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required={count === 0}
        onChange={e => {
          setImgUrl(e);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required={count === 0}
        onChange={e => {
          setImdbUrl(e);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required={count === 0}
        onChange={e => {
          setImdbId(e);
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={(!title || !imgUrl || !imdbUrl || !imdbId)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
