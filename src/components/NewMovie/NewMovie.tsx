import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie, MovieField } from '../../types/Movie';
import { pattern, initialMovieState } from '../../variables/variables';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

const isValidUrl = (url: string) => pattern.test(url);

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState(initialMovieState);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleFieldChange = (fieldName: string, value: string) => {
    setNewMovie(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const clearForm = () => {
    setNewMovie(initialMovieState);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);
    clearForm();
    setCount(prevCount => prevCount + 1);
    setButtonDisabled(true);
  };

  const checkFields = () => {
    const notFilled = !newMovie.title || !newMovie.imgUrl
  || !newMovie.imdbUrl || !newMovie.imdbId;

    const isValid
    = !notFilled && isValidUrl(newMovie.imgUrl) && isValidUrl(newMovie.imdbUrl);

    setButtonDisabled(!isValid);
  };

  useEffect(() => {
    checkFields();
  }, [newMovie]);

  return (
    <form
      className="NewMovie"
      key={count}
      method="POST"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name={`${MovieField.Title}`}
        label="Title"
        value={newMovie.title}
        onChange={value => handleFieldChange(MovieField.Title, value)}
        required
        count={count}
        setCount={setCount}
      />

      <TextField
        name={`${MovieField.Description}`}
        label="Description"
        value={newMovie.description}
        onChange={value => handleFieldChange(MovieField.Description, value)}
        count={count}
        setCount={setCount}
      />

      <TextField
        name={`${MovieField.ImgUrl}`}
        label="Image URL"
        value={newMovie.imgUrl}
        required
        onChange={value => handleFieldChange(MovieField.ImgUrl, value)}
        count={count}
        setCount={setCount}
        isValidImgUrl={isValidUrl(newMovie.imgUrl)}
      />

      <TextField
        name={`${MovieField.ImdbUrl}`}
        label="Imdb URL"
        value={newMovie.imdbUrl}
        required
        onChange={value => handleFieldChange(MovieField.ImdbUrl, value)}
        count={count}
        setCount={setCount}
        isValidImdbUrl={isValidUrl(newMovie.imdbUrl)}
      />

      <TextField
        name={`${MovieField.ImdbId}`}
        label="Imdb ID"
        value={newMovie.imdbId}
        required
        onChange={value => handleFieldChange(MovieField.ImdbId, value)}
        count={count}
        setCount={setCount}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={buttonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
