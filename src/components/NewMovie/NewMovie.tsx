import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const changeTitle = (value: string) => setTitle(value);
  const changeDescription = (value: string) => setDescription(value);
  const changeImgUrl = (value: string) => setImgUrl(value);
  const changeImdbUrl = (value: string) => setImdbUrl(value);
  const changeImdbId = (value: string) => setImdbId(value);

  const formIsReady = title.trim()
    && imgUrl.trim()
    && imdbUrl.trim()
    && imdbId.trim();

  const onSubmit = () => {
    if (formIsReady) {
      onAdd({
        title,
        description,
        imdbId,
        imdbUrl,
        imgUrl,
      });

      setTitle('');
      setDescription('');
      setImdbId('');
      setImdbUrl('');
      setImgUrl('');
      setCount(prev => prev + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmit}>
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
            disabled={!formIsReady}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
