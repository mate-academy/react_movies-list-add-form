import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [imgUrl, setImageURL] = useState('');
  // const [imdbUrl, setImdbURL] = useState('');
  // const [imdbId, setImdbID] = useState('');
  const [count, setCount] = useState(0);

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const disabledOn: boolean =
    !movie.title.trim() ||
    !movie.imgUrl.trim() ||
    !movie.imdbUrl.trim() ||
    !movie.imdbId.trim();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title: movie.title,
      description: movie.description,
      imgUrl: movie.imgUrl,
      imdbUrl: movie.imdbUrl,
      imdbId: movie.imdbId,
    });

    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(count + 1);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      method="POST"
      action="/api/posts"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={event => setMovie({ ...movie, title: event })}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={event => setMovie({ ...movie, description: event })}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={event => setMovie({ ...movie, imgUrl: event })}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={event => setMovie({ ...movie, imdbUrl: event })}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={event => setMovie({ ...movie, imdbId: event })}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledOn}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
