import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  handleAddNewMovie: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ handleAddNewMovie }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setimgUrl] = useState('');
  const [imdbUrl, setimdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const handelSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    handleAddNewMovie(newMovie);

    setCount(state => state + 1);
    setTitle('');
    setDescription('');
    setimgUrl('');
    setimdbUrl('');
    setImdbId('');
  };

  const isButtonAvailable = !title.trim() || !description.trim()
    || !imgUrl.trim() || !imdbUrl.trim() || !imdbId.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handelSubmit}
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
        onChange={setimgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setimdbUrl}
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
            disabled={isButtonAvailable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
