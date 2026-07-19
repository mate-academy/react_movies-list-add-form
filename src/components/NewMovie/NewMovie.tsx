import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [ImdbUrl, setImdbUrl] = useState('');
  const [ImdbId, setImdbId] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl: ImdbUrl,
      imdbId: ImdbId,
    };

    onAdd(newMovie);

    setTitle('');
    setDescription('');
    setimgUrl('');
    setImdbUrl('');
    setImdbId('');

    setCount(count + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
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
        onChange={setimgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={ImdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={ImdbId}
        onChange={setImdbId}
        required
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
              !ImdbUrl.trim() ||
              !ImdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
