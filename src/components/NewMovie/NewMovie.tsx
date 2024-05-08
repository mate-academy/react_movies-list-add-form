import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  const hasDisable = title && imgUrl && imdbUrl && imdbId;

  const handleClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCount(prev => prev + 1);
    const movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(movie);
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
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => handleClick(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newTitle => setTitle(newTitle.trimStart())}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newDescription => setDescription(newDescription.trimStart())}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newImgUrl => setImgUrl(newImgUrl.trimStart())}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newImdbUrl => setImdbUrl(newImdbUrl.trimStart())}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newImdbId => setImdbId(newImdbId.trimStart())}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          {hasDisable ? (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
            >
              Add
            </button>
          ) : (
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled
            >
              Add
            </button>
          )}
        </div>
      </div>
    </form>
  );
};
