import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const initialValues = {
    title: '',
    description: '',
    imageURL: '',
    imdbURL: '',
    imdbID: '',
  };

  const [movieInfo, setMovieInfo] = useState(initialValues);

  const handleValueChange = (name: string, value: string) => {
    setMovieInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const refreshForm = () => {
    setMovieInfo(initialValues);
  };

  const disabledButton: boolean =
    !movieInfo.title.trim() ||
    !movieInfo.imageURL.trim() ||
    !movieInfo.imdbURL.trim() ||
    !movieInfo.imdbID.trim();

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd({
      title: movieInfo.title.trim(),
      description: movieInfo.description.trim(),
      imgUrl: movieInfo.imageURL.trim(),
      imdbUrl: movieInfo.imdbURL.trim(),
      imdbId: movieInfo.imdbID.trim(),
    });

    setCount(prevCount => prevCount + 1);
    refreshForm();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleFormSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieInfo.title}
        onChange={value => handleValueChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieInfo.description}
        onChange={value => handleValueChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieInfo.imageURL}
        onChange={value => handleValueChange('imageURL', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieInfo.imdbURL}
        onChange={value => handleValueChange('imdbURL', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieInfo.imdbID}
        onChange={value => handleValueChange('imdbID', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
