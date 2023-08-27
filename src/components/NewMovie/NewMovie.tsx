import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

const emptyString = '';

type NewMovieProps = {
  onAdd: (movie: Movie) => void
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, increaseCount] = useState(3);
  const [title, setTitle] = useState(emptyString);
  const [description, setDescription] = useState(emptyString);
  const [imgUrl, setImgUrl] = useState(emptyString);
  const [imdbUrl, setImdbUrl] = useState(emptyString);
  const [imdbId, setImdbId] = useState(emptyString);
  const addMovie = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
      movieId: `${Date.now()}${imdbId}`,
    });
    increaseCount(oldCount => oldCount + 1);
    setTitle(emptyString);
    setDescription(emptyString);
    setImgUrl(emptyString);
    setImdbUrl(emptyString);
    setImdbId(emptyString);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => addMovie(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newTitle => setTitle(newTitle)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newDescription => setDescription(newDescription)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newUrl => setImgUrl(newUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newUrl => setImdbUrl(newUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newId => setImdbId(newId)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={
              title === emptyString
              || imgUrl === emptyString
              || imdbUrl === emptyString
              || imdbId === emptyString
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
