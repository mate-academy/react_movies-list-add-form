import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [field, setField] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const handleEvent = (name: string, value: string) => {
    setField(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFields = () => {
    setField({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const movie = {
      title: field.title.trim(),
      description: field.description.trim(),
      imgUrl: field.imgUrl.trim(),
      imdbUrl: field.imdbUrl.trim(),
      imdbId: field.imdbId.trim(),
    };

    if (!movie.title || !movie.imgUrl || !movie.imdbUrl || !movie.imdbId) {
      return;
    }

    onAdd(movie);
    clearFields();
    setCount(count + 1);
  }

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={field.title}
        onChange={handleEvent}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={field.description}
        onChange={handleEvent}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={field.imgUrl}
        onChange={handleEvent}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={field.imdbUrl}
        onChange={handleEvent}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={field.imdbId}
        onChange={handleEvent}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={
              !field.title.trim() ||
              !field.imgUrl.trim() ||
              !field.imdbUrl.trim() ||
              !field.imdbId.trim()
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
