import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../../constants/pattern';

type Props = {
  onAdd: (NewMovie: Movie) => void
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const initMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };

  const [newMovie, setNewMovie] = useState(initMovie);
  const handleMovieChange = (event: React.ChangeEvent<HTMLInputElement>,
    key: keyof Movie) => {
    setNewMovie(prevMovie => (
      { ...prevMovie, [key]: event.target.value }
    ));
  };

  const resetForm = () => {
    setNewMovie(initMovie);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!pattern.test(newMovie.imdbUrl)) {
      return;
    }

    if (!pattern.test(newMovie.imgUrl)) {
      return;
    }

    onAdd(newMovie);

    resetForm();
    setCount(prevCount => prevCount + 1);
  };

  const isDisabled = !newMovie.title.trim()
  || !newMovie.imgUrl.trim()
  || !newMovie.imdbUrl.trim()
  || !newMovie.imdbId.trim()
  || !newMovie.imdbUrl.match(pattern)
  || !newMovie.imgUrl.match(pattern);

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={e => handleMovieChange(e, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={e => handleMovieChange(e, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={e => handleMovieChange(e, 'imgUrl')}
        required

      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={e => handleMovieChange(e, 'imdbUrl')}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={e => handleMovieChange(e, 'imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
