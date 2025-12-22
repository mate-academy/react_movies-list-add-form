import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onSubmit: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onSubmit }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);

  const [imgUrl, setImgUrl] = useState('');
  const [imgUrlError, setImgUrlError] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbUrlError, setImdbUrlError] = useState(false);

  const [imdbId, setImdbId] = useState('');
  const [imdbIdError, setImdbIdError] = useState(false);

  const onSubmitEvent = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(!titleError);
    }

    if (!description) {
      setDescriptionError(!descriptionError);
    }

    if (!imgUrl) {
      setImgUrlError(!imgUrlError);
    }

    if (!imdbUrl) {
      setImdbUrlError(!imdbUrlError);
    }

    if (!imdbId) {
      setImdbIdError(!imdbIdError);
    }

    if (!title || description || imgUrl || imdbUrl || imdbId) {
      return;
    }

    onSubmit({
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    });

    setCount(count + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={onSubmitEvent}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={newValue => {
          setTitle(newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={newValue => {
          setDescription(newValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newValue => {
          setImgUrl(newValue);
        }}
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newValue => {
          setImdbUrl(newValue);
        }}
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newValue => {
          setImdbId(newValue);
        }}
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
