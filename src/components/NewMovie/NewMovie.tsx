/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';
import { isDisabled, isEmpty } from '../../services/trim';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [hasImgUrlError, setHasImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [hasImdbIdError, setHasImdbIdError] = useState(false);

  const [description, setDescription] = useState('');

  const handleTitleChange = (newValue: string) => {
    setTitle(newValue);
    setHasTitleError(false);
  };

  // const handleTitleBlur = () => {
  //   setHasTitleError(isEmpty(title.trim()));
  // };

  const handleDescriptionChange = (newValue: string) => {
    setDescription(newValue);
  };

  const handleImgUrlChange = (newValue: string) => {
    setImgUrl(newValue);
    setHasImgUrlError(false);
  };

  // const handleImgUrlBlur = () => {
  //   setHasImgUrlError(isEmpty(imgUrl.trim()));
  // };

  const handleImdbUrlChange = (newValue: string) => {
    setImdbUrl(newValue);
    setHasImdbUrlError(false);
  };

  // const handleImdbUrlBlur = () => {
  //   setHasImdbUrlError(isEmpty(imdbUrl.trim()));
  // };

  const handleImdbIdChange = (newValue: string) => {
    setImdbId(newValue);
    setHasImdbIdError(false);
  };

  // const handleImdbIdBlur = () => {
  //   setHasImdbIdError(isEmpty(imdbId.trim()));
  // };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedImgUrl = imgUrl.trim();
    const trimmedImdbUrl = imdbUrl.trim();
    const trimmedImdbId = imdbId.trim();
    const trimmedDescription = description.trim();

    const hasError =
      isEmpty(trimmedTitle) ||
      isEmpty(trimmedImgUrl) ||
      isEmpty(trimmedImdbUrl) ||
      isEmpty(trimmedImdbId);

    setHasTitleError(isEmpty(trimmedTitle));
    setHasImgUrlError(isEmpty(trimmedImgUrl));
    setHasImdbUrlError(isEmpty(trimmedImdbUrl));
    setHasImdbIdError(isEmpty(trimmedImdbId));

    if (hasError) {
      return;
    }

    const newMovie: Movie = {
      title: trimmedTitle,
      imgUrl: trimmedImgUrl,
      imdbUrl: trimmedImdbUrl,
      imdbId: trimmedImdbId,
      description: trimmedDescription,
    };

    onAdd(newMovie);

    setTitle('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setDescription('');

    setHasTitleError(false);
    setHasImgUrlError(false);
    setHasImdbUrlError(false);
    setHasImdbIdError(false);

    setCount(prev => prev + 1);
  };

  const trimmedValues = {
    title: title.trim(),
    imgUrl: imgUrl.trim(),
    imdbUrl: imdbUrl.trim(),
    imdbId: imdbId.trim(),
  };
  const disabled = isDisabled(trimmedValues);

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={handleImgUrlChange}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrlChange}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={handleImdbIdChange}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
