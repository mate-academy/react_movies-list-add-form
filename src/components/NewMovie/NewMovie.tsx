import { FormEvent, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

const isValidUrl = (value: string) => {
  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\w]*))?)$/;

  return pattern.test(value);
};

const movieDataTemplate = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKey, setFormKey] = useState(0);

  const [movie, setMovie] = useState<Movie>(movieDataTemplate);

  const isButtonDisabled = (input: Movie) => {
    return (
      !input.title.trim() ||
      !input.imgUrl.trim() ||
      !isValidUrl(input.imgUrl) ||
      !input.imdbId.trim() ||
      !input.imdbUrl.trim() ||
      !isValidUrl(input.imdbUrl)
    );
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    onAdd({
      ...movie,
      title: movie.title.trim(),
      description: movie.description.trim(),
      imgUrl: movie.imgUrl.trim(),
      imdbUrl: movie.imdbUrl.trim(),
      imdbId: movie.imdbId.trim(),
    });

    setMovie(movieDataTemplate);

    setFormKey(prev => prev + 1);
  };

  const handleFieldChange = (fieldName: keyof Movie, value: string) => {
    setMovie(prevMovie => ({
      ...prevMovie,
      [fieldName]: value,
    }));
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={movie.title}
        onChange={newValue => handleFieldChange('title', newValue)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={movie.description}
        onChange={newValue => handleFieldChange('description', newValue)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={movie.imgUrl}
        validate={isValidUrl}
        onChange={newValue => handleFieldChange('imgUrl', newValue)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={movie.imdbUrl}
        onChange={newValue => handleFieldChange('imdbUrl', newValue)}
        validate={isValidUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={movie.imdbId}
        onChange={newValue => handleFieldChange('imdbId', newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={isButtonDisabled(movie)}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
