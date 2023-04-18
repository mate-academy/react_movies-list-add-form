import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

export type AddMovieFunction = (movie: Movie) => void;

export const NewMovie = ({ onAdd }: { onAdd: AddMovieFunction }) => {
  const [count, setCount] = useState(0);
  const [newMovieObj, setNewMovieObj] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const getFieldValue = (name: string) => (value: string) => {
    setNewMovieObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isDisabled = !newMovieObj.imdbId.trim()
          || !newMovieObj.imdbUrl.trim()
          || !newMovieObj.imgUrl.trim()
          || !newMovieObj.title.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovieObj);
    setNewMovieObj({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovieObj.title}
        onChange={getFieldValue('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovieObj.description}
        onChange={getFieldValue('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovieObj.imgUrl}
        onChange={getFieldValue('imgUrl')}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovieObj.imdbUrl}
        onChange={getFieldValue('imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovieObj.imdbId}
        onChange={getFieldValue('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={isDisabled}
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
