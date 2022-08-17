import { FormEvent, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface Props {
  onAdd: CallableFunction,
}

export const NewMovie: React.FC< Props > = (props) => {
  const { onAdd } = props;
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const newMovie = () => {
    return {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };
  };

  const clearForm = () => {
    setCount(prevCount => prevCount + 1);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const addMovie = (event:FormEvent) => {
    event.preventDefault();
    onAdd((prevMovies: Movie[]) => [...prevMovies, newMovie()]);
    clearForm();
  };

  const disactiveButton = () => {
    return (title.trim() === ''
    || imgUrl.trim() === ''
    || imdbUrl.trim() === ''
    || imdbId.trim() === '');
  };

  return (
    <form className="NewMovie" key={count} onSubmit={addMovie}>
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
        onChange={setImgUrl}
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
            disabled={disactiveButton()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
