import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  // const [imgUrl, setImgUrl] = useState('');
  // const [imdbUrl, setImdbUrl] = useState('');
  // const [imdbId, setImdbId] = useState('');

  const [movie, setMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const resetFormValues = () => {
    setMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMovie: Movie = {
      ...movie,
    };

    onAdd(newMovie);

    setCount(prevCount => prevCount + 1);
    resetFormValues();
  };

  const isButtonEnabled = (
    movie.title.trim()
    && movie.imdbUrl.trim()
    && movie.imgUrl.trim()
    && movie.imdbId.trim()
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
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
        value={movie.title}
        onChange={handleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isButtonEnabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
