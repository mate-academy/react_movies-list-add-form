import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void,
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const isTitleRequired = true;
  const [description, setDescription] = useState('');
  const isDescriptionRequired = false;
  const [imgUrl, setImgUrl] = useState('');
  const isImageUrlRequired = true;
  const [imdbUrl, setImdbUrl] = useState('');
  const isImdbUrlRequired = true;
  const [imdbId, setImdbId] = useState('');
  const isImdbIdRequired = true;
  const hasErrors = (isTitleRequired && !title.trim())
    || (isDescriptionRequired && !description.trim())
    || (isImageUrlRequired && !imgUrl.trim())
    || (isImdbUrlRequired && !imdbUrl.trim())
    || (isImdbIdRequired && !imdbId.trim())
    || !pattern.test(imgUrl)
    || !pattern.test(imdbUrl);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const onFormSubmit = (event: React.FormEvent) => {
    const newMovie: Movie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    event.preventDefault();
    setCount(prev => prev + 1);
    onAdd(newMovie);
    resetForm();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={onFormSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required={isTitleRequired}
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={setDescription}
        required={isDescriptionRequired}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={setImgUrl}
        required={isImageUrlRequired}
        validationFunc={() => pattern.test(imgUrl)}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={setImdbUrl}
        required={isImdbUrlRequired}
        validationFunc={() => pattern.test(imdbUrl)}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required={isImdbIdRequired}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={hasErrors}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
