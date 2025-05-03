import { useState } from 'react';
import { TextField } from '../TextField';
import { handleSubmit } from './index';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event =>
        handleSubmit(
          event,
          title,
          imgUrl,
          imdbUrl,
          imdbId.toString(),
          description,
          setTitle,
          setDescription,
          setImgUrl,
          setImdbUrl,
          setImdbId,
          setCount,
          onAdd,
        )
      }
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => {
          setTitle(value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => {
          setDescription(value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={value => {
          setImgUrl(value);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={value => {
          setImdbUrl(value);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId.toString()}
        required
        onChange={value => {
          setImdbId(value);
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !title.trim() ||
              !imgUrl.trim() ||
              !imdbUrl.trim() ||
              !imdbId.toString().trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
