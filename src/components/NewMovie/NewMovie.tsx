import { MouseEvent, useState } from 'react';
import { TextField } from '../TextField';
import { NewMovieProps } from './NewMovie.types';

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const addMovie = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(count + 1);
  };

  const handleTitleAdd = (value: string) => {
    setTitle(value);
  };

  const handleDescriptionAdd = (value: string) => {
    setDescription(value);
  };

  const handleImgUrlAdd = (value: string) => {
    setImgUrl(value);
  };

  const handleImdbUrlAdd = (value: string) => {
    setImdbUrl(value);
  };

  const handleImdbIdAdd = (value: string) => {
    setImdbId(value);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleAdd}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionAdd}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlAdd}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlAdd}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdAdd}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={event => addMovie(event)}
            disabled={
              !title
              || !imgUrl
              || !imdbUrl
              || !imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
