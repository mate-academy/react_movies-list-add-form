import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie: React.FC<{ onAdd: (movie: Movie) => void }> = ({
  onAdd,
}) => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState<Movie>({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [errors, setErrors] = useState<Partial<Movie>>({});

  const resetInputState = () => {
    setInputValue({
      title: '',
      imgUrl: '',
      imdbUrl: '',
      imdbId: '',
      description: '',
    });
    setErrors({});
  };

  const handleInput = (value: string, key: keyof Movie) => {
    setInputValue(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleBlur = (key: keyof Movie) => {
    const value = inputValue[key];

    if (!value || !value.trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [key]: `${key} is required`,
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        [key]: undefined,
      }));
    }
  };

  const isNotEmptyOrSpaces = (str: string) => {
    return str.trim() !== '';
  };

  const fields = () => {
    const { title, imgUrl, imdbUrl, imdbId } = inputValue;

    return (
      isNotEmptyOrSpaces(title) &&
      isNotEmptyOrSpaces(imgUrl) &&
      isNotEmptyOrSpaces(imdbUrl) &&
      isNotEmptyOrSpaces(imdbId)
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    const { imgUrl, imdbUrl } = inputValue;
    const urlErrors: Partial<Movie> = {};

    if (!imgUrl.trim().match(pattern)) {
      urlErrors.imgUrl = 'Invalid Image URL format';
    }

    if (!imdbUrl.trim().match(pattern)) {
      urlErrors.imdbUrl = 'Invalid IMDB URL format';
    }

    setErrors(urlErrors);

    if (Object.keys(urlErrors).length > 0) {
      return;
    }

    const movieToAdd: Movie = {
      ...inputValue,
      description: inputValue.description?.trim() || '',
    };

    onAdd(movieToAdd);
    resetInputState();
    setCount(prevCount => prevCount + 1);
  };

  const isButtonActive = () => {
    return fields();
  };

  return (
    <form className="NewMovie" onSubmit={handleSubmit} key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={inputValue.title}
        onChange={value => handleInput(value, 'title')}
        onBlur={() => handleBlur('title')}
        required
        error={errors.title}
      />

      <TextField
        name="description"
        label="Description"
        value={inputValue.description}
        onChange={value => handleInput(value, 'description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={inputValue.imgUrl}
        onChange={value => handleInput(value, 'imgUrl')}
        onBlur={() => handleBlur('imgUrl')}
        required
        error={errors.imgUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={inputValue.imdbUrl}
        onChange={value => handleInput(value, 'imdbUrl')}
        onBlur={() => handleBlur('imdbUrl')}
        required
        error={errors.imdbUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={inputValue.imdbId}
        onChange={value => handleInput(value, 'imdbId')}
        onBlur={() => handleBlur('imdbId')}
        required
        error={errors.imdbId}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isButtonActive()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewMovie;
