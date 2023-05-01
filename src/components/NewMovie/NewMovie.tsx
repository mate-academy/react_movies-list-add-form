import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDiscription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isDisabledButton = (): boolean => {
    // eslint-disable-next-line max-len
    const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

    if (!(title && pattern.test(imageUrl) && pattern.test(imdbUrl) && imdbId)) {
      return true;
    }

    return false;
  };

  const handleTitleField = (value: string) => (
    setTitle(value)
  );

  const handleDescriptioniField = (value: string) => (
    setDiscription(value)
  );

  const handleImageUrlField = (value: string) => (
    setImageUrl(value)
  );

  const handleImdbUrlField = (value: string) => (
    setImdbUrl(value)
  );

  const handleImdbIdField = (value: string) => (
    setImdbId(value)
  );

  const resetForm = () => {
    setCount(prevCount => prevCount + 1);
    setTitle('');
    setDiscription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl: imageUrl,
      imdbUrl,
      imdbId,
    };

    if (newMovie !== null) {
      onAdd(newMovie);
    }

    resetForm();
  };

  return (
    <form className="NewMovie" key={count}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChangeField={handleTitleField}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChangeField={handleDescriptioniField}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imageUrl}
        onChangeField={handleImageUrlField}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChangeField={handleImdbUrlField}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChangeField={handleImdbIdField}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            onClick={handleSubmit}
            disabled={isDisabledButton()}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
