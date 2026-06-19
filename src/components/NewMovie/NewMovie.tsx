import { useState } from 'react';
import { Movie } from '../../types/Movie';
import { TextField } from '../TextField';

type Props = {
  onAdd?: (movie: Movie) => void;
};

const urlRegexString =
  '^((([A-Za-z]{3,9}:(?://)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
  '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[+~%/\\.\\w-_]*)?' +
  '\\??(?:[-+=&;%@,\\.\\w_]*)#?(?:[,\\.!/\\\\\\w]*))?)$';

const urlPattern = new RegExp(urlRegexString);

const validateUrl = (url: string): boolean => {
  return urlPattern.test(url);
};

export const NewMovie = ({ onAdd = () => {} }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [formKey, setFormKey] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const trimmedTitle = title.trim();
  const trimmedImgUrl = imgUrl.trim();
  const trimmedImdbUrl = imdbUrl.trim();
  const trimmedImdbId = imdbId.trim();

  const isFormValid =
    trimmedTitle &&
    trimmedImgUrl &&
    trimmedImdbUrl &&
    trimmedImdbId &&
    validateUrl(trimmedImgUrl) &&
    validateUrl(trimmedImdbUrl);

  const handleSubmit = (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();

    if (!isFormValid) {
      return;
    }

    const newMovie: Movie = {
      title: trimmedTitle,
      description,
      imgUrl: trimmedImgUrl,
      imdbUrl: trimmedImdbUrl,
      imdbId: trimmedImdbId,
    };

    onAdd(newMovie);

    // Clear the form and reset touched status
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setFormKey(prevKey => prevKey + 1);
  };

  return (
    <form className="NewMovie" key={formKey} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required
        validate={validateUrl}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
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
