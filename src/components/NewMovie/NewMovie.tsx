import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

/* eslint-disable */

const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

export const NewMovie: React.FC<Props> = ( {onAdd} ) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);

  const isValidUrl = (url: string) => (pattern.test(url));

  const emptyFields = !title.trim()
  || !imgUrl.trim()
  || !imdbUrl.trim()
  || !imdbId.trim()
  || !(isValidUrl(imgUrl))
  || !(isValidUrl(imdbUrl));

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (event: React.FormEvent) => {
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
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(event) => setImgUrl(event.target.value)}
        isValidUrl={isValidUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(event) => setImdbUrl(event.target.value)}
        isValidUrl={isValidUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(event) => setImdbId(event.target.value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={emptyFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
