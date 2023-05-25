import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (arg0: Movie) => void,
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const canSubmit = title && imageUrl && imdbUrl && imdbId;

  const movie: Movie = {
    title,
    description,
    imgUrl: imageUrl,
    imdbUrl,
    imdbId,
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>, newMovie: Movie) => {
    event.preventDefault();
    onAdd(newMovie);
    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        handleSubmit(event, movie);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(input) => {
          setTitle(input);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(input) => {
          setDescription(input);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrl}
        onChange={(input) => {
          setImageUrl(input);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(input) => {
          setImdbUrl(input);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(input) => {
          setImdbId(input);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!canSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
