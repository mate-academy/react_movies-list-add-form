import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export type NewMovieProps = {
  onAdd: (movie: Movie) => void
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const [imdbUrl, setImdbUrl] = useState<string>('');
  const [imdbId, setImdbId] = useState<string>('');

  const isButtonDisabled = ():boolean => {
    if (title.trim().length === 0) {
      return true;
    }

    if (imgUrl.trim().length === 0) {
      return true;
    }

    if (imdbUrl.trim().length === 0) {
      return true;
    }

    if (imdbId.trim().length === 0) {
      return true;
    }

    return false;
  };

  const createMovie = (event: React.MouseEvent) => {
    event.preventDefault();

    const movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    onAdd(movie);
    setCount((prev) => prev + 1);
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(e) => {
          setTitle(e);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(e) => {
          setDescription(e);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(e) => {
          setImgUrl(e);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(e) => {
          setImdbUrl(e);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(e) => {
          setImdbId(e);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled()}
            onClick={createMovie}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
