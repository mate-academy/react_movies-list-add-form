import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void; 
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbID] = useState('');

  const handleOnAdd = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId
    })

    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbID('');
  }

  return (
    <form className="NewMovie" key={count} onAdd={handleOnAdd}>
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

      <TextField name="imdbUrl" 
        label="Imdb URL" 
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        />

      <TextField 
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbID}
        required
        />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
