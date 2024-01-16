import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({onAdd}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);

  function clearForm() {
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount((count) => count + 1);

  }

  const handleAddForm = (event: React.FormEvent) => {
    event.preventDefault();
  }

  const isDisabled = !(title && imgUrl && imdbUrl && imdbId);

  return (
    <form 
      className="NewMovie" 
      key={count}
      onSubmit={handleAddForm}
      >
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
        value={imgUrl}
        onChange={setImageUrl}
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
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
            onClick={() => {
              onAdd(
                {
                  title,
                  description,
                  imgUrl,
                  imdbUrl,
                  imdbId,
                }
              );
              clearForm();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
