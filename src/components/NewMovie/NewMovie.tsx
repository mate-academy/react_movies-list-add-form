import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void,
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const emptyMovie = {
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  };
  const [newMovie, setNewMovie] = useState(emptyMovie);
  const [isUrlIncorrect, setIsUrlIncorrect] = useState(false);

  const {
    title, description, imgUrl, imdbUrl, imdbId,
  } = newMovie;

  const onChange = (value: string, name: string) => {
    setNewMovie({
      ...newMovie,
      [name]: value,
    });
  };

  const isSubmitDisabled = () => (
    !title || !imgUrl || !imdbUrl || !imdbId || isUrlIncorrect
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(newMovie);
    setCount(() => count + 1);
    setNewMovie(emptyMovie);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => handleSubmit(event)}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={onChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={onChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={onChange}
        required
        setIsUrlIncorrect={setIsUrlIncorrect}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={onChange}
        required
        setIsUrlIncorrect={setIsUrlIncorrect}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={onChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
