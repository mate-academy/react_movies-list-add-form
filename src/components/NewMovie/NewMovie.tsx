import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const addMovie = () => {
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
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
            disabled={
              !title || !imgUrl || !imdbUrl || !imdbId
            }
            onClick={addMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
