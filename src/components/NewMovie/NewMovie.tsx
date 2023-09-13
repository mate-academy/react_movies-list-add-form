import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (newMovie: Movie) => void;
};

const EMPTY_STRING = '';
const initialValues = {
  title: EMPTY_STRING,
  description: EMPTY_STRING,
  imgUrl: EMPTY_STRING,
  imdbUrl: EMPTY_STRING,
  imdbId: EMPTY_STRING,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [movieData, setMovieData] = useState<Movie>(initialValues);

  const {
    title,
    description,
    imdbUrl,
    imgUrl,
    imdbId,
  } = movieData;

  const isSubmitButtonDisabled = !title.trim()
  || !imdbId.trim()
  || !imdbUrl.trim()
  || !imgUrl.trim();

  const clearFields = () => setMovieData({
    title: EMPTY_STRING,
    description: EMPTY_STRING,
    imgUrl: EMPTY_STRING,
    imdbUrl: EMPTY_STRING,
    imdbId: EMPTY_STRING,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearFields();

    onAdd(movieData);
    setCount((prev) => prev + 1);
  };

  function handleInputChange(value: string, field: string) {
    setMovieData(prevState => (
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
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(value: string) => handleInputChange(value, 'imdbUrl')}
        required
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
            disabled={isSubmitButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
