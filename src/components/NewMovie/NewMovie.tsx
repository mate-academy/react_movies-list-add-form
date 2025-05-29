import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../App';

interface NewMovieProps {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [keysForm, setKeysForm] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDiscription] = useState<string>('');
  const [imageURL, setImageURL] = useState<string>('');
  const [imdbURL, setImdbURL] = useState<string>('');
  const [imdbID, setImdbID] = useState<string>('');

  const resetForm = (): void => {
    setKeysForm(current => current + 1);
    setTitle('');
    setDiscription('');
    setImageURL('');
    setImdbURL('');
    setImdbID('');
  };

  const activeAdd = title && imageURL && imdbURL && imdbID;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!activeAdd) {
      return;
    }

    const newMovie: Movie = {
      title: title,
      description: description,
      imgUrl: imageURL,
      imdbUrl: imdbURL,
      imdbId: imdbID,
    };

    onAdd(newMovie);

    resetForm();
  };

  return (
    <form className="NewMovie" key={keysForm} onSubmit={handleSubmit}>
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
        onChange={setDiscription}
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
            disabled={!activeAdd}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
