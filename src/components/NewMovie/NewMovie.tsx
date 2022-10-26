import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (arg: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // eslint-disable-next-line
  const createNewMovie = (event: any) => {
    event.preventDefault();
    if (title && imgUrl && imdbUrl && imdbId) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setCount(current => current + 1);
    }
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => {
          setTitle(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => {
          setDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => {
          setImgUrl(event);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => {
          setImdbUrl(event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => {
          setImdbId(event);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={(event) => {
              createNewMovie(event);
            }}
            disabled={(!title || !imgUrl || !imdbUrl || !imdbId)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
