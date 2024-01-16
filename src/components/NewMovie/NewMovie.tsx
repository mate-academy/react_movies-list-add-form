import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void
};

const initialMovieFields = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [movieFields, setMovieFields] = useState(initialMovieFields);

  const [count, setCount] = useState(0);

  const handleField = (name: string, value: string) => {
    setMovieFields(prev => ({ ...prev, [name]: value }));
  };

  const isHiddenAdd = !movieFields.title.trim() || !movieFields.imdbId.trim()
    || !movieFields.imdbUrl.trim() || !movieFields.imgUrl.trim();

  const reset = () => {
    setMovieFields(initialMovieFields);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setCount((currentCount) => currentCount + 1);

    onAdd(movieFields);

    reset();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movieFields.title}
        onChange={(value) => handleField('title', value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movieFields.description}
        onChange={(value) => handleField('description', value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movieFields.imgUrl}
        onChange={(value) => handleField('imgUrl', value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movieFields.imdbUrl}
        onChange={(value) => handleField('imdbUrl', value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movieFields.imdbId}
        onChange={(value) => handleField('imdbId', value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isHiddenAdd}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
