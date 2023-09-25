import { useState } from 'react';

import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageURL] = useState('');
  const [imdbUrl, setImdbURL] = useState('');
  const [imdbId, setImdbId] = useState('');

  const reset = () => {
    setTitle('');
    setDescription('');
    setImageURL('');
    setImdbURL('');
    setImdbId('');
  };

  const reqiuredIsEmpty = () => {
    return !(title.trim())
      || !(imgUrl.trim()) || !(imdbUrl.trim()) || !(imdbId.trim());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (reqiuredIsEmpty()) {
      return;
    }

    onAdd({
      title,
      description,
      imdbUrl,
      imgUrl,
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
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(titleValue) => setTitle(titleValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(descriptionValue) => setDescription(descriptionValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(imgUrlValue) => setImageURL(imgUrlValue)}
        required
        validate
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(imdbUrlValue) => setImdbURL(imdbUrlValue)}
        required
        validate
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(imdbIdValue) => setImdbId(imdbIdValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={reqiuredIsEmpty()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
