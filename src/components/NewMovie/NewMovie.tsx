import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDesctiption] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);

  const disabledButton = title && imgUrl && imdbUrl && imdbId;

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleDesctiptionChange = (value: string) => {
    setDesctiption(value);
  };

  const handleImgUrlChange = (value: string) => {
    setImgUrl(value);
  };

  const handleImdbUrlChange = (value: string) => {
    setImdbUrl(value);
  };

  const handleImdbIdUrlChange = (value: string) => {
    setImdbId(value);
  };

  const reset = () => {
    setTitle('');
    setDesctiption('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);
    reset();
  };

  return (
    <form
      action="/api"
      method="POST"
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
        onChange={handleDesctiptionChange}
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
        onChange={handleImdbIdUrlChange}
        required
      />

      {
        disabledButton
          ? (
            <div className="field is-grouped">
              <div className="control">
                <button
                  type="submit"
                  data-cy="submit-button"
                  className="button is-link"
                >
                  Add
                </button>
              </div>
            </div>
          )
          : (
            <div className="field is-grouped">
              <div className="control">
                <button
                  type="submit"
                  data-cy="submit-button"
                  className="button is-link"
                  disabled
                >
                  Add
                </button>
              </div>
            </div>
          )
      }
    </form>
  );
};
