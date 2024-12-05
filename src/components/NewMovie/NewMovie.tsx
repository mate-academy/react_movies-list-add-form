import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState<number>(0);
  const [titleValue, setTitleValue] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const [imgUrlValue, setImgUrlValue] = useState<string>('');
  const [imdbUrlValue, setImdbUrlValue] = useState<string>('');
  const [imdbIdValue, setImdbIdValue] = useState<string>('');
  const [isValidated, setIsValidated] = useState<boolean>(true);
  const isButtonDisabled = !(
    !!titleValue &&
    !!imgUrlValue &&
    !!imdbUrlValue &&
    !!imdbIdValue &&
    isValidated
  );
  const resetAllFields = () => {
    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
    setIsValidated(true);
  };

  const urlValidaton = (url: string): boolean => {
    const pattern =
      // eslint-disable-next-line max-len
      /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (url.match(pattern) || !url) {
      setIsValidated(true);

      return true;
    }

    setIsValidated(false);

    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const movie: Movie = {
      title: titleValue,
      description: descriptionValue,
      imgUrl: imgUrlValue,
      imdbUrl: imdbUrlValue,
      imdbId: imdbIdValue,
    };

    onAdd(movie);
    setCount(prev => prev + 1);
    resetAllFields();
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={(newTitle: string) => {
          setTitleValue(newTitle);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={(newDescription: string) => {
          setDescriptionValue(newDescription);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={(newImgUrl: string) => {
          setImgUrlValue(newImgUrl);
        }}
        isValidated={urlValidaton(imgUrlValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={(newImdbUrl: string) => {
          setImdbUrlValue(newImdbUrl);
        }}
        isValidated={urlValidaton(imdbUrlValue)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={(newImdbIdValue: string) => {
          setImdbIdValue(newImdbIdValue);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
