import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isValidUrl = (url: string) => {
    try {
      new URL(url);

      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !title.trim() ||
      !imgUrl.trim() ||
      !imdbUrl.trim() ||
      !imdbId.trim() ||
      !isValidUrl(imgUrl) ||
      !isValidUrl(imdbUrl)
    ) {
      return;
    }

    onAdd({
      title: title.trim(),
      description,
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });
  };


  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value=""
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value=""
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value=""
        onChange={setImgUrl}
        required
        validate={isValidUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value=""
        onChange={setImdbUrl}
        required
        validate={isValidUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value=""
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
