import { useEffect, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [newMovie, setNewMovie] = useState({
    title: '',
    description: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  // тут !'' = true значить кнопка disabled
  const notFilled = !newMovie.title || !newMovie.imgUrl
    || !newMovie.imdbUrl || !newMovie.imdbId;

  const isValidImgUrl = pattern.test(newMovie.imgUrl);
  const isValidImdbUrl = pattern.test(newMovie.imdbUrl);

  const handleFieldChange = (fieldName: string, value: string) => {
    setNewMovie(prevState => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const clearForm = () => {
    setNewMovie({
      title: '',
      description: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onAdd(newMovie);
    clearForm();
    setCount(prevCount => prevCount + 1);
  };

  const checkFields = () => {
    if ((notFilled === false)
      && (isValidImgUrl === true) && (isValidImdbUrl === true)) {
      setButtonDisabled(notFilled);
    }
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
        name="title"
        label="Title"
        value={newMovie.title}
        onChange={value => handleFieldChange('title', value)}
        required
        count={count}
        setCount={setCount}
      />

      <TextField
        name="description"
        label="Description"
        value={newMovie.description}
        onChange={value => handleFieldChange('description', value)}
        count={count}
        setCount={setCount}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={newMovie.imgUrl}
        required
        onChange={value => handleFieldChange('imgUrl', value)}
        count={count}
        setCount={setCount}
        isValidImgUrl={isValidImgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={newMovie.imdbUrl}
        required
        onChange={value => handleFieldChange('imdbUrl', value)}
        count={count}
        setCount={setCount}
        isValidImdbUrl={isValidImdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={newMovie.imdbId}
        required
        onChange={value => handleFieldChange('imdbId', value)}
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
