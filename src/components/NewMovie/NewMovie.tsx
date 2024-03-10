import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie = ({ onAdd }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleTrim = () => {
    if (
      Object.values(newMovie)
        .filter(key => key !== newMovie.description)
        .some(item => item.trim() === '')
    ) {
      return true;
    }

    return false;
  };

  // eslint-disable-next-line max-len, prettier/prettier
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const handleTitleChange = (newVal: string) => {
    setNewMovie(current => ({
      ...current,
      title: newVal,
    }));
  };

  const handleDescriptionChange = (newVal: string) => {
    setNewMovie(current => ({
      ...current,
      description: newVal,
    }));
  };

  const handleImgUrlChange = (newVal: string) => {
    if (pattern.test(newVal)) {
      setNewMovie(current => ({
        ...current,
        imgUrl: newVal,
      }));
    }
  };

  const handleImdbUrlChange = (newVal: string) => {
    if (pattern.test(newVal)) {
      setNewMovie(current => ({
        ...current,
        imdbUrl: newVal,
      }));
    }
  };

  const handleImdbIdChange = (newVal: string) => {
    setNewMovie(current => ({
      ...current,
      imdbId: newVal,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleTrim();
    onAdd(newMovie);
    setCount(count + 1);
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit} key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={newValue => handleTitleChange(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={newValue => handleDescriptionChange(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={newValue => handleImgUrlChange(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={newValue => handleImdbUrlChange(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={newValue => handleImdbIdChange(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={handleTrim()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
