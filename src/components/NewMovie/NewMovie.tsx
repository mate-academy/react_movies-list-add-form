import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const initialMovie: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const urlPattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const validateUrl = (url: string): string | null => {
  return url.match(urlPattern) ? null : 'should be a valid URL';
};

export const NewMovie = ({ onAdd }: Props) => {
  const [count, setCount] = useState(0);
  const [movie, setMovie] = useState(initialMovie);

  const areRequiredFieldsFilled = [
    movie.title,
    movie.imgUrl,
    movie.imdbUrl,
    movie.imdbId,
  ].every(value => value.trim() !== '');

  const areUrlsValid = [movie.imdbUrl, movie.imgUrl].every(url =>
    url.match(urlPattern),
  );

  const isFormValid = areRequiredFieldsFilled && areUrlsValid;

  const resetFields = () => {
    setMovie(initialMovie);
  };

  const handleChange = (field: keyof Movie) => (value: string) => {
    setMovie(currentState => ({ ...currentState, [field]: value }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!isFormValid) {
      return;
    }

    onAdd({
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    });

    resetFields();
    setCount(current => current + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={handleChange('title')}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={handleChange('description')}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        onChange={handleChange('imgUrl')}
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={handleChange('imdbUrl')}
        validate={validateUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={handleChange('imdbId')}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
