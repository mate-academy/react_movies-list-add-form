import { FC, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

 type Props = {
   onAdd: (newMovieToAdd: Movie) => void
 };

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imdbURL, setImdbURL] = useState('');
  const [imdbID, setImdbID] = useState('');

  const hasValidFields = title && imageURL && imdbURL && imdbID;

  const newMovieToAdd: Movie = {
    title,
    description,
    imgUrl: imageURL,
    imdbUrl: imdbURL,
    imdbId: imdbID,
  };

  const clearForm = () => {
    setCount(state => state + 1);
    setTitle('');
    setDescription('');
    setImageURL('');
    setImdbURL('');
    setImdbID('');
  };

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovieToAdd);

    clearForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmitForm}
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
        value={imageURL}
        onChange={setImageURL}
        validateUrl
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbURL}
        onChange={setImdbURL}
        validateUrl
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbID}
        onChange={setImdbID}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!hasValidFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
