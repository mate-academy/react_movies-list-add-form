import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const newMovieObject: Movie = {
    title: title,
    description: description,
    imgUrl: imgUrl,
    imdbUrl: imdbUrl,
    imdbId: imdbId,
  };

  function handleIsDisabled(newValue: string, key: keyof Movie) {
    newMovieObject[key] = newValue;

    if (
      !newMovieObject.title.trim() ||
      !newMovieObject.imgUrl.trim() ||
      !newMovieObject.imdbUrl.trim() ||
      !newMovieObject.imdbId.trim()
    ) {
      setIsDisabled(true);

      return;
    }

    if (isDisabled) {
      setIsDisabled(false);
    }
  }

  const handleTitleChange = (value: string) => {
    setTitle(value);
    handleIsDisabled(value, 'title');
  };

  const handleDescChange = (value: string) => {
    setDescription(value);
    handleIsDisabled(value, 'description');
  };

  const handleImgUrlChange = (value: string) => {
    setImgUrl(value);
    handleIsDisabled(value, 'imgUrl');
  };

  const handleImdbUrlChange = (value: string) => {
    setImdbUrl(value);
    handleIsDisabled(value, 'imdbUrl');
  };

  const handleImdbIdChange = (value: string) => {
    setImdbId(value);
    handleIsDisabled(value, 'imdbId');
  };

  function clearForm() {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setIsDisabled(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      typeof newMovieObject.description !== 'undefined' &&
      !newMovieObject.description.trim()
    ) {
      delete newMovieObject.description;
    }

    onAdd(newMovieObject);

    clearForm();

    setCount(currentCount => currentCount + 1);
  }

  return (
    <form
      className="NewMovie"
      key={count}
      id="form"
      onSubmit={handleSubmit}
      // onChange={handleIsDisabled}
    >
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
        onChange={handleDescChange}
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
            disabled={isDisabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
