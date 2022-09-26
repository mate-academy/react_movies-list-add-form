import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        onAdd({
          title, description, imgUrl, imdbUrl, imdbId,
        });
        setCount(count + 1);

        setTitle('');
        setDescription('');
        setImgUrl('');
        setimdbUrl('');
        setImdbId('');
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(movieName) => {
          setTitle(movieName);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(movieAbout) => {
          setDescription(movieAbout);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(imgLink) => {
          setImgUrl(imgLink);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(movieLink) => {
          setimdbUrl(movieLink);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(movieId) => {
          setImdbId(movieId);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={
              !(title && imgUrl && imdbId && imdbUrl)
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
