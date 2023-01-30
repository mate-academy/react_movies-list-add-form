import { useCallback, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie:React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const increaseCount = () => {
    setCount(state => state + 1);
  };

  const onChangeTitle = useCallback(
    (newValue: string) => setTitle(newValue), [setTitle],
  );

  const onChangeDescription = useCallback(
    (newValue: string) => setDescription(newValue), [setDescription],
  );

  const onChangeImgUrl = useCallback(
    (newValue: string) => setImgUrl(newValue), [setImgUrl],
  );

  const onChangeImdbUrl = useCallback(
    (newValue: string) => setImdbUrl(newValue), [setImdbUrl],
  );

  const onChangeImdbId = useCallback(
    (newValue: string) => setImdbId(newValue), [setImdbId],
  );

  const clear = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    increaseCount();
    clear();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={onChangeTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={onChangeDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={onChangeImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={onChangeImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={onChangeImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!(title && imgUrl && imdbUrl && imdbId)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
