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

  const newMovie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const inputTitle = (value: string) => {
    setTitle(value);
  };

  const inputDescription = (value: string) => {
    setDescription(value);
  };

  const inputImgUrl = (value: string) => {
    setImgUrl(value);
  };

  const inputImdbUrl = (value: string) => {
    setImdbUrl(value);
  };

  const inputImdbId = (value: string) => {
    setImdbId(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newMovie);
    setCount(prevCount => prevCount + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => {
          inputTitle(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => {
          inputDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => {
          inputImgUrl(event);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => {
          inputImdbUrl(event);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => {
          inputImdbId(event);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
