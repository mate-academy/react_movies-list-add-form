import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { MovieType } from '../../App';

type NewMovieProps = {
  onAdd: (movie: MovieType) => void; // onAdd — це функція, яка не приймає аргументів і нічого не повертає
};

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const reset = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbId('');
    setImdbUrl('');
  };

  const isFormValid = () => {
    return title && imgUrl && imdbUrl && imdbId;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setCount(prevCount => prevCount + 1);

    if (isFormValid()) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
    } else {
    }

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={reset}
      className="NewMovie"
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={value => setTitle(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={value => setDescription(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={value => setImgUrl(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => setImdbUrl(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={value => setImdbId(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
