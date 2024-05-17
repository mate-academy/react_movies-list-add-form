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
  const [imageURL, setImageURL] = useState('');
  const [imdbURL, setImdbURL] = useState('');
  const [imdbID, setImdbID] = useState('');

  const refreshForm = () => {
    setTitle('');
    setDescription('');
    setImageURL('');
    setImdbURL('');
    setImdbID('');
  };

  const disabledButton: boolean =
    !title.trim() || !imageURL.trim() || !imdbURL.trim() || !imdbID.trim();

  const buttonHandler = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imageURL.trim(),
      imdbUrl: imdbURL.trim(),
      imdbId: imdbID.trim(),
    });

    setCount(prevCount => prevCount + 1);
    refreshForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={buttonHandler}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
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
        value={imageURL}
        onChange={setImageURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbURL}
        onChange={setImdbURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbID}
        onChange={setImdbID}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
