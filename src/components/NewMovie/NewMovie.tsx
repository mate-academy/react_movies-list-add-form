import React, { FormEvent, useState, useCallback } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = React.memo(({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
  }, []);
  const handleDescriptionChange = useCallback((value: string) => {
    setDescription(value);
  }, []);
  const handleImgUrlChange = useCallback((value: string) => {
    setImgUrl(value);
  }, []);
  const handleImdbUrlChange = useCallback((value: string) => {
    setImdbUrl(value);
  }, []);
  const handleImdbIdChange = useCallback((value: string) => {
    setImdbId(value);
  }, []);

  const isValid = !title.trim() || !imgUrl.trim()
    || !imdbUrl.trim() || !imdbId.trim();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setCount(count + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

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
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
});
