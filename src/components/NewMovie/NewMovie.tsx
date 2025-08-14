import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovieForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [formInput, setFormIput] = useState<Movie>(initialMovieForm);

  function handleTitle(newValue: string) {
    setFormIput(input => ({
      ...input,
      title: newValue,
    }));
  }

  function handleDescription(newValue: string) {
    setFormIput(input => ({
      ...input,
      description: newValue,
    }));
  }

  function handleImgUrl(newValue: string) {
    setFormIput(input => ({
      ...input,
      imgUrl: newValue,
    }));
  }

  function handleImdbUrl(newValue: string) {
    setFormIput(input => ({
      ...input,
      imdbUrl: newValue,
    }));
  }

  function handleImdbId(newValue: string) {
    setFormIput(input => ({
      ...input,
      imdbId: newValue,
    }));
  }

  const isNotValidForm =
    !formInput.title.trim() ||
    !formInput.imgUrl.trim() ||
    !formInput.imdbUrl.trim() ||
    !formInput.imdbId.trim();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(formInput);
    setCount(prev => prev + 1);
    setFormIput(initialMovieForm);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={formInput.title}
        onChange={(newValue: string) => handleTitle(newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={formInput.description}
        onChange={(newValue: string) => handleDescription(newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={formInput.imgUrl}
        onChange={(newValue: string) => handleImgUrl(newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={formInput.imdbUrl}
        onChange={(newValue: string) => handleImdbUrl(newValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={formInput.imdbId}
        onChange={(newValue: string) => handleImdbId(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isNotValidForm}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
