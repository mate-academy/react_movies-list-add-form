import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type NewMovieProps = {
  onAdd: (movie: Movie) => void;
};

const initialFormData: Movie = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

const pattern =
  // eslint-disable-next-line max-len
  /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

const createUrlValidator = (label: string) => (value: string) => {
  return pattern.test(value) ? '' : `${label} is not valid`;
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const { title, description, imgUrl, imdbUrl, imdbId } = formData;

  const isImageUrlValid = pattern.test(imgUrl.trim());
  const isImdbUrlValid = pattern.test(imdbUrl.trim());

  const isFormValid =
    title.trim() !== '' &&
    imgUrl.trim() !== '' &&
    imdbUrl.trim() !== '' &&
    imdbId.trim() !== '' &&
    isImageUrlValid &&
    isImdbUrlValid;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) {
      return;
    }

    const movie: Movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAdd(movie);

    setFormData(initialFormData);
    setCount(currentCount => currentCount + 1);
  };

  const handleFieldChange = (field: keyof Movie) => (value: string) => {
    setFormData(currentFormData => ({
      ...currentFormData,
      [field]: value,
    }));
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        required
        name="title"
        label="Title"
        value={title}
        onChange={handleFieldChange('title')}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleFieldChange('description')}
      />

      <TextField
        required
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleFieldChange('imgUrl')}
        validate={createUrlValidator('Image URL')}
      />

      <TextField
        required
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleFieldChange('imdbUrl')}
        validate={createUrlValidator('Imdb URL')}
      />

      <TextField
        required
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleFieldChange('imdbId')}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!isFormValid}
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
