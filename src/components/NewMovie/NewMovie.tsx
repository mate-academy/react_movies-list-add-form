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
  const [newMovie, setNewMovies] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const [required, setRequired] = useState({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleChange = (key: string, newVal: string) => {
    setNewMovies(current => ({
      ...current,
      [key]: newVal,
    }));
  };

  const handleValidate = () => {
    if (Object.values(required).every(item => item.trim() !== '')) {
      return false;
    }

    return true;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!handleValidate()) {
      onAdd(newMovie);
      setCount(count + 1);
      setRequired({
        title: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
      setNewMovies({
        title: '',
        description: '',
        imgUrl: '',
        imdbUrl: '',
        imdbId: '',
      });
    }
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit} key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={newValue => {
          handleChange('title', newValue);
          setRequired(current => ({
            ...current,
            title: newValue,
          }));
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={newValue => handleChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        onChange={newValue => {
          handleChange('imgUrl', newValue);
          setRequired(current => ({
            ...current,
            imgUrl: newValue,
          }));
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        onChange={newValue => {
          handleChange('imdbUrl', newValue);
          setRequired(current => ({
            ...current,
            imdbUrl: newValue,
          }));
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        onChange={newValue => {
          handleChange('imdbId', newValue);
          setRequired(current => ({
            ...current,
            imdbId: newValue,
          }));
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={handleValidate()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
