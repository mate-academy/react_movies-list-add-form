import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

export const NewMovie = ({
  onAdd = () => {},
}: {
  onAdd?: (movie: Movie) => void;
}) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentDescription, setCurrentDescription] = useState('');
  const [currentImdbUrl, setCurrentImdbUrl] = useState('');
  const [currentImdbId, setCurrentImdbId] = useState('');
  const [currentImgUrl, setCurrentImgUrl] = useState('');

  const allFieldsAreValid = () => {
    const urlFields = ['imdbUrl', 'imgUrl'];
    const urlPattern = new RegExp(
      `^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|` +
        `(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)` +
        `((?:\/[+~%/\\.\\w-_]*)?\\??(?:[-+=&;%@,\\w_]*)#?(?:[,.!/\\\\\\w]*))?)$`,
    );

    const urlFieldsValid = urlFields.every(field => {
      const fieldValue = field === 'imdbUrl' ? currentImdbUrl : currentImgUrl;

      return urlPattern.test(fieldValue);
    });

    return (
      currentTitle.trim() &&
      currentImgUrl.trim() &&
      urlFieldsValid &&
      currentImdbId.trim()
    );
  };

  const resetForm = () => {
    setCurrentTitle('');
    setCurrentDescription('');
    setCurrentImdbUrl('');
    setCurrentImdbId('');
    setCurrentImgUrl('');

    setCount(prevCount => prevCount + 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (allFieldsAreValid()) {
      onAdd({
        title: currentTitle.trim(),
        description: currentDescription.trim(),
        imgUrl: currentImgUrl.trim(),
        imdbUrl: currentImdbUrl.trim(),
        imdbId: currentImdbId.trim(),
      });

      resetForm();
    }
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={currentTitle}
        onChange={setCurrentTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={currentDescription}
        onChange={setCurrentDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={currentImgUrl}
        onChange={setCurrentImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={currentImdbUrl}
        onChange={setCurrentImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={currentImdbId}
        onChange={setCurrentImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!allFieldsAreValid()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
