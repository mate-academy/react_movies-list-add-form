import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isAbleToAdd = title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId;

  const createNewMovie = (): Movie => {
    return {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };
  };

  function reset() {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  }

  function addNewMovie(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newMovie = createNewMovie();

    reset();

    setCount(current => current + 1);

    onAdd(newMovie);
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={addNewMovie}
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
            disabled={!isAbleToAdd}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
