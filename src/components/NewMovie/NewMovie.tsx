import { useState, useCallback } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd(newMovie: Movie) : void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
  }, [title]);

  const handleDescriptionChange = useCallback((value: string) => {
    setDescription(value);
  }, [description]);

  const handleImgUrlChange = useCallback((value: string) => {
    setImgUrl(value);
  }, [imgUrl]);

  const handleImdbUrlChange = useCallback((value: string) => {
    setImdbUrl(value);
  }, [imdbUrl]);

  const handleImdbId = useCallback((value: string) => {
    setImdbId(value);
  }, [imdbId]);

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    clearForm();
    setCount(prevCount => prevCount + 1);
  };

  const isButtonActive = title.trim()
    && imdbId.trim()
    && imdbUrl.trim()
    && imgUrl.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleFormSubmit}
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
        required
        onChange={handleImgUrlChange}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={handleImdbUrlChange}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={handleImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isButtonActive}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
