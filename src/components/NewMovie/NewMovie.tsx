import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (details: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [formState, setFormState] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [count, setCount] = useState(0);

  const handleInputChange = (name: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleButton = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(formState);

    setFormState({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });

    setCount((prevCount) => prevCount + 1);
  };

  const disabledButton
      = !!formState.title.trim()
      && !!formState.imgUrl.trim()
      && !!formState.imdbUrl.trim()
      && !!formState.imdbId.trim();

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleButton}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formState.title}
        onChange={(value) => handleInputChange('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formState.description}
        onChange={(value) => handleInputChange('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formState.imgUrl}
        onChange={(value) => handleInputChange('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formState.imdbUrl}
        onChange={(value) => handleInputChange('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formState.imdbId}
        onChange={(value) => handleInputChange('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!disabledButton}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
