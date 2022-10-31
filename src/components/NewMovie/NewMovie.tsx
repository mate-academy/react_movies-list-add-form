import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitile] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  const createMovie = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });
  };

  const disabledCheck = (
    !title.trim() || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim()
  );

  return (
    <form
      className="NewMovie"
      onSubmit={createMovie}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitile}
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
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={setImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledCheck}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
