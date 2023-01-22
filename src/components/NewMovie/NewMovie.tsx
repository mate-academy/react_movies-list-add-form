import React, { useState, memo, useCallback } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

export interface Props {
  onAdd: (movie: Movie) => void
}

export const NewMovie: React.FC<Props> = memo((props) => {
  const {
    onAdd,
  } = props;

  const [count, setCount] = useState(0);
  const [title, setNewTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const movie = {
    title,
    description,
    imgUrl,
    imdbUrl,
    imdbId,
  };

  const formValidation = title.trim() && imgUrl.trim()
    && imdbUrl.trim() && imdbId.trim();

  const reset = useCallback(() => {
    setNewTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setCount(prev => prev + 1);

      if (formValidation) {
        onAdd(movie);
      }

      reset();
    }, [movie],
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        required
        value={title}
        onChange={setNewTitle}
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
        required
        value={imgUrl}
        onChange={setImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={imdbUrl}
        onChange={setImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        required
        value={imdbId}
        onChange={setImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!formValidation}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
});
