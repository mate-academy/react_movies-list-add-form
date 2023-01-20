import { useState, memo, useCallback } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (newMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = memo(({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const changeTitle = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const changeDescription = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const changeImgUrl = useCallback((value: string) => {
    setImgUrl(value);
  }, []);

  const changeImdbUrl = useCallback((value: string) => {
    setImdbUrl(value);
  }, []);

  const changeImdbId = useCallback((value: string) => {
    setImdbId(value);
  }, []);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleFormSubmit = () => {
    onAdd(
      {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      },
    );

    resetForm();

    setCount(prevCount => prevCount + 1);
  };

  const isReadyToSubmit = title
    && imdbId.trim()
    && imdbUrl.trim()
    && imgUrl.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        event.preventDefault();
        handleFormSubmit();
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={changeTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={changeDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={changeImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={changeImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={changeImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isReadyToSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
});
