import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type State = {
  title: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
  description: string;
};

export const NewMovie: React.FC<{ onAdd: (movie: Movie) => void }> = ({
  onAdd,
}) => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState<State>({
    title: '',
    imgUrl: '',
    imdbUrl: '',
    imdbId: '',
    description: '',
  });
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [errors, setErrors] = useState<Partial<State>>({});

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

  const handleInput = (value: string, key: keyof State) => {
    setInputValue(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleBlur = (key: keyof State) => {
    if (!inputValue[key].trim()) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [key]: `${key} is required`,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (
      !inputValue.imgUrl.match(pattern) ||
      !inputValue.imdbUrl.match(pattern)
    ) {
      return;
    }

    onAdd(inputValue as Movie);
    resetInputState();
    setCount(prevCount => prevCount + 1);
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
        onBlur={() => handleBlur('description')}
        error={errors.description}
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
            disabled={
              !inputValue.title ||
              !inputValue.imgUrl ||
              !inputValue.imdbUrl ||
              !inputValue.imdbId
            }
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewMovie;
