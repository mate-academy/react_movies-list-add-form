import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { pattern } from '../../utils';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const initialState: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);

  const [newMovie, setNewMovie] = useState<Movie>(initialState);

  const {
    title,
    description,
    imdbUrl,
    imgUrl,
    imdbId,
  } = newMovie;

  const isSubmitDisabled = !title.trim()
    || !pattern.test(imdbUrl)
    || !pattern.test(imgUrl)
    || !imdbId.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd(newMovie);
    setNewMovie(initialState);
    setCount((prev) => prev + 1);
  };

  function handleInputChange(value: string, field: string) {
    setNewMovie(prevState => (
      {
        ...prevState,
        [field]: value,
      }
    ));
  }

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
        value={title}
        onChange={(value: string) => handleInputChange(value, 'title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(value: string) => handleInputChange(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(value: string) => handleInputChange(value, 'imgUrl')}
        required
        validation
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value: string) => handleInputChange(value, 'imdbUrl')}
        required
        validation
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(value: string) => handleInputChange(value, 'imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
