import { FC, useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

interface Props {
  onAdd: (movie: Movie) => void;
}

type InputTypes = 'title' | 'description' | 'imgUrl' | 'imdbUrl' | 'imdbId';

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movies, setMovies] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const validInputs = () => {
    const { title, imgUrl, imdbUrl, imdbId } = movies;

    return title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();
  };

  function handleInputChange(name: InputTypes, value: string) {
    setMovies(prevMovie => ({
      ...prevMovie,
      [name]: value,
    }));
  }

  const reset = () => {
    setMovies({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(movies);
    reset();
    setCount(count + 1);
  };

  return (
    <form onSubmit={handleSubmit} className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movies.title}
        onChange={value => {
          handleInputChange('title', value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movies.description}
        onChange={value => handleInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        required
        value={movies.imgUrl}
        onChange={value => handleInputChange('imgUrl', value)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        required
        value={movies.imdbUrl}
        onChange={value => handleInputChange('imdbUrl', value)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movies.imdbId}
        required
        onChange={value => handleInputChange('imdbId', value)}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!validInputs()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
