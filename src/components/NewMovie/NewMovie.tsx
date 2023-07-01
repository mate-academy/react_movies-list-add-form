import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState('');
  const [titleHasError, setTitleHasError] = useState(true);

  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlHasError, setImgUrlHasError] = useState(true);

  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbUrlHasError, setImdbUrlHasError] = useState(true);

  const [imdbId, setImdbId] = useState('');
  const [imdbIdHasError, setImdbIdHasError] = useState(true);

  const formHasErrors
    = titleHasError || imgUrlHasError || imdbUrlHasError || imdbIdHasError;

  const clearFormFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setTitleHasError(true); // set errors to true, so submit button will disabled after adding
  };

  const handlerOnSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    onAdd({
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    });
    setCount(currentCount => currentCount + 1);
    clearFormFields();
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={(event) => {
        handlerOnSubmit(event);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChangeCallback={(data, fieldHasError) => {
          setTitleHasError(fieldHasError);
          setTitle(data);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChangeCallback={(data) => {
          setDescription(data);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChangeCallback={(data, fieldHasError) => {
          setImgUrlHasError(fieldHasError);
          setImgUrl(data);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChangeCallback={(data, fieldHasError) => {
          setImdbUrlHasError(fieldHasError);
          setImdbUrl(data);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChangeCallback={(data, fieldHasError) => {
          setImdbIdHasError(fieldHasError);
          setImdbId(data);
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={formHasErrors}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
