import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  addMovie: (movie: Movie) => void
};
export const NewMovie:React.FC<Props> = ({ addMovie }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  // const [nameValue, setNameValue] = useState('');
  // const [descriptionValue, setDescriptionValue] = useState('');
  // const [img, setImg] = useState('');
  // const [imdbUrlValue, setImdbUrlValue] = useState('');
  // const [imdbIdValue, setImdbIdValue] = useState('');
  const [movi, setMovie] = useState<Movie>({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });

  const buttonDisablet = () => {
    if (movi.title.trim()
    && movi.imdbId.trim()
    && movi.imdbUrl.trim()
    && movi.imgUrl.trim()) {
      return false;
    }

    return true;
  };

  const resetFild = () => {
    setMovie({
      ...movi,
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addMovie(movi);
    setCount(count + 1);
    resetFild();
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleSubmit}
      key={count}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movi}
        onChange={setMovie}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movi}
        onChange={setMovie}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movi}
        onChange={setMovie}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movi}
        onChange={setMovie}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movi}
        onChange={setMovie}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={buttonDisablet()}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
