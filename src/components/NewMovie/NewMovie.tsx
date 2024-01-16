import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialFields: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [movieFields, setMovieFields] = useState<Movie>(initialFields);

  const isButtonDisabled = Object.entries(movieFields)
    .map(([key, value]) => (!value.trim() && key !== 'description'))
    .some(Boolean);

  const handleField = (name: string, value: string) => {
    setMovieFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd({
      title: movieFields.title,
      description: movieFields.description,
      imgUrl: movieFields.imgUrl,
      imdbUrl: movieFields.imdbUrl,
      imdbId: movieFields.imdbId,
    });

    setMovieFields(initialFields);
    setCount(prev => prev + 1);
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
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
