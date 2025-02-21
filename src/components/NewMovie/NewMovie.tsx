import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);

  const checkingInputs = () => {
    return title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();
  };

  const isValidUrl = (url: string) => {
    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    return pattern.test(url);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (checkingInputs() && isValidUrl(imgUrl) && isValidUrl(imdbUrl)) {
      const newMovie: Movie = {
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      };

      onAdd(newMovie);
      setTitle('');
      setDescription('');
      setImgUrl('');
      setImdbUrl('');
      setImdbId('');
      setCount(prevCount => prevCount + 1);
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={e => setImgUrl(e.target.value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="IMDB URL"
        value={imdbUrl}
        onChange={e => setImdbUrl(e.target.value)}
        required
      />

      <TextField
        name="imdbId"
        label="IMDB ID"
        value={imdbId}
        onChange={e => setImdbId(e.target.value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !checkingInputs() || !isValidUrl(imgUrl) || !isValidUrl(imdbUrl)
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
