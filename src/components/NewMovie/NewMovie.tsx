import { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const checkEmptyFields = (
    !title.trim()
  || !imgUrl.trim()
  || !imdbUrl.trim()
  || !imdbId.trim());

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setCount(prev => prev + 1);

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
      onSubmit={handleSubmit}
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
        value={imgUrl}
        onChange={setImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
      />

      <TextField
        name="imdbId"
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
            disabled={checkEmptyFields}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
