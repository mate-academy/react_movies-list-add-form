import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movies: Array<Movie>) => void;
  movies: Array<Movie>;
};

export const NewMovie: React.FC<Props> = ({ onAdd, movies }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const handleResetForm = () => {
    setCount(prevKey => prevKey + 1); // оновлюємо ключ для реініціалізації
    setTitle('');
    setDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const isFormValid = [title, description, imageUrl, imdbUrl, imdbId].every(
    value => value.trim() !== '',
  );

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={() => {
        event!.preventDefault();
        const newMovie: Movie = {
          title: title,
          description: description,
          imgUrl: imageUrl,
          imdbUrl: imdbUrl,
          imdbId: imdbId,
        };

        if (!Object.values(newMovie).some(value => !value)) {
          onAdd([...movies, newMovie]);
          handleResetForm();
        }
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrl}
        onChange={setImageUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
