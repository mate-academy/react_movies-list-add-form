import React, { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface NewMovieProps {
  onAdd: (movie: Movie) => void;
}

const pattern = new RegExp(
  '^((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[-;:&=+$,\\w]+@)?[A-Za-z0-9.-]+|' +
    '(?:www\\.|[-;:&=+$,\\w]+@)[A-Za-z0-9.-]+)((?:\\/[+~%\\/\\w-_]*)?' +
    '\\??(?:[-+=&;%@.\\w_]*)#?(?:[.!/\\\\\\w]*))?)$',
);

export const NewMovie: React.FC<NewMovieProps> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const [isValid, setIsValid] = useState({
    title: false,
    imgUrl: false,
    imdbUrl: false,
    imdbId: false,
  });

  const validateUrl = (url: string) => pattern.test(url);

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    const isFormValid =
      !!title.trim() &&
      !!imgUrl.trim() &&
      validateUrl(imgUrl) &&
      !!imdbUrl.trim() &&
      validateUrl(imdbUrl) &&
      !!imdbId.trim();

    if (!isFormValid) {
      return;
    }

    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setIsValid({
      title: false,
      imgUrl: false,
      imdbUrl: false,
      imdbId: false,
    });
    setCount(count + 1);
  };

  const isSubmitDisabled = !(
    isValid.title &&
    validateUrl(imgUrl) &&
    validateUrl(imdbUrl) &&
    !!imdbId.trim()
  );

  return (
    <form className="NewMovie">
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        required
        onChange={newValue => {
          setTitle(newValue);
          setIsValid(prev => ({ ...prev, title: !!newValue.trim() }));
        }}
        onBlur={() => setIsValid(prev => ({ ...prev, title: !!title.trim() }))}
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
        onChange={newValue => {
          setImgUrl(newValue);
          setIsValid(prev => ({
            ...prev,
            imgUrl: validateUrl(newValue),
          }));
        }}
        onBlur={() =>
          setIsValid(prev => ({ ...prev, imgUrl: validateUrl(imgUrl) }))
        }
        customValidation={validateUrl}
        customValidationMessage="Invalid URL"
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newValue => {
          setImdbUrl(newValue);
          setIsValid(prev => ({
            ...prev,
            imdbUrl: validateUrl(newValue),
          }));
        }}
        onBlur={() =>
          setIsValid(prev => ({ ...prev, imdbUrl: validateUrl(imdbUrl) }))
        }
        customValidation={validateUrl}
        customValidationMessage="Invalid URL"
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={newValue => {
          setImdbId(newValue);
          setIsValid(prev => ({ ...prev, imdbId: !!newValue.trim() }));
        }}
        onBlur={() =>
          setIsValid(prev => ({ ...prev, imdbId: !!imdbId.trim() }))
        }
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleClick}
            disabled={isSubmitDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
