import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie: React.FC<
{ onAdd:(movie: Movie)=>void }
> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={() => {
        setCount(oldCount => oldCount + 1);
        onAdd({
          title,
          description,
          imdbId,
          imdbUrl,
          imgUrl,
        });

        setTitle('');
        setDescription('');
        setImdbId('');
        setImdbUrl('');
        setImgUrl('');
      }}
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
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!(
              title.length !== 0
            && imdbId.length !== 0
            && imdbUrl.length !== 0
            && imgUrl.length !== 0)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
