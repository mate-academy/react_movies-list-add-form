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
  const [description, setDescription] = useState('');

  const [imgUrl, setImgUrl] = useState('');
  const [isValidImgUrl, setIsValidImgUrl] = useState(false);

  const [imdbUrl, setImdbUrl] = useState('');
  const [isValidImdbUrl, setIsValidImdbUrl] = useState(false);

  const [imdbId, setImdbId] = useState('');

  const activeButton = true
    ? title && imgUrl && imdbUrl && imdbId && isValidImgUrl && isValidImdbUrl
    : false;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!activeButton) {
      return;
    }

    setCount(count + 1);
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    });
  }

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        handleSubmit(event);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={event => {
          setTitle(event);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={event => {
          setDescription(event);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={event => {
          setImgUrl(event);
        }}
        url={isValidImgUrl}
        setUrl={setIsValidImgUrl}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={event => {
          setImdbUrl(event);
        }}
        url={isValidImdbUrl}
        setUrl={setIsValidImdbUrl}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={event => {
          setImdbId(event);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            disabled={!activeButton ? true : false}
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
