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
  // const [hasTitleError, setHasTitleError] = useState(false);

  const [description, setDescription] = useState('');
  // const [hasTitleError, setHasTitleError] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  // const [hasImgUrlError, setHasImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  // const [hasImdbUrlError, setHasImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  // const [hasImdbIdError, setHasImdbIdError] = useState(false);

  const clearFormFields = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  const handlerOnSubmit = (event:React.FormEvent) => {
    event.preventDefault();
    clearFormFields();
    setCount(currentCount => currentCount + 1);

    onAdd({
      title,
      description,
      imgUrl,
      imdbId,
      imdbUrl,
    });
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
        onChange={(data) => {
          setTitle(data);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(data) => {
          setDescription(data);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        required
        onChange={(data) => {
          setImgUrl(data);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        required
        onChange={(data) => {
          setImdbUrl(data);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        required
        onChange={(data) => {
          setImdbId(data);
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!title || !imgUrl || !imdbUrl || !imdbId}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
