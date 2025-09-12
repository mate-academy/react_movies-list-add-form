import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

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

  const handleAddMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      title.length === 0 ||
      imgUrl.length === 0 ||
      imdbUrl.length === 0 ||
      imdbId.length === 0
    ) {
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });
    setCount(count + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={e => handleAddMovie(e)}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={val => {
          setTitle(val);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={val => {
          setDescription(val);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={val => setImgUrl(val)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={val => setImdbUrl(val)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={val => setImdbId(val)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              title.length === 0 ||
              imgUrl.length === 0 ||
              imdbUrl.length === 0 ||
              imdbId.length === 0
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
