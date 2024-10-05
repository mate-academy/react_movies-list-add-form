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
  // const [hasTitleError, setHasTitleError] = useState(false);

  const [currentDescription, setCurrentDescription] = useState('');

  const [currentImdbUrl, setCurrentImdbUrl] = useState('');
  // const [hasImdbUrl, setHasImdbUrl] = useState(false);

  const [currentImdbId, setCurrentImdbId] = useState('');
  // const [hasImdbId, setHasImdbId] = useState(false);

  const [currentImgUrl, setCurrentImgUrl] = useState('');
  // const [hasImgUrl, setHasImgUrl] = useState(false);

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

    return currentTitle && urlFieldsValid && currentImdbId;
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

      setCurrentTitle('');
      setCurrentDescription('');
      setCurrentImdbUrl('');
      setCurrentImdbId('');
      setCurrentImgUrl('');

      setCount(count + 1);
    }
  };

  // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setCurrentTitle(event.target.value);
  //   hasTitleError(false);
  // };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={currentTitle}
        onChange={title => setCurrentTitle(title)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={currentDescription}
        onChange={description => setCurrentDescription(description)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={currentImgUrl}
        onChange={imgUrl => setCurrentImgUrl(imgUrl)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={currentImdbUrl}
        onChange={imdbUrl => setCurrentImdbUrl(imdbUrl)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={currentImdbId}
        onChange={imdbId => setCurrentImdbId(imdbId)}
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
