import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAddMovie: (movie: Movie) => void;
}

export const NewMovie = ({ onAddMovie }: Props) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [imgUrlError, setImgUrlError] = useState(false);
  const [imdbUrlError, setImdbUrlError] = useState(false);

  const isFormValid =
    title.trim() && imgUrl.trim() && imdbUrl.trim() && imdbId.trim();

  const pattern =
    // eslint-disable-next-line max-len
    /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isImgUrlValid = pattern.test(imgUrl);
    const isImdbUrlValid = pattern.test(imdbUrl);

    setImgUrlError(!isImgUrlValid);
    setImdbUrlError(!isImdbUrlValid);

    if (!isImgUrlValid || !isImdbUrlValid) {
      return;
    }

    const newMovie: Movie = {
      title: title.trim(),
      description: description.trim(),
      imgUrl: imgUrl.trim(),
      imdbUrl: imdbUrl.trim(),
      imdbId: imdbId.trim(),
    };

    onAddMovie(newMovie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');

    setCount(c => c + 1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={setTitle}
        required
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
        onChange={value => {
          setImgUrl(value);
          setImgUrlError(false);
        }}
        required
      />

      {imgUrlError && (
        <p className="help is-danger">imgUrl is not a valid URL</p>
      )}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={value => {
          setImdbUrl(value);
          setImdbUrlError(false);
        }}
        required
      />
      {imdbUrlError && (
        <p className="help is-danger">imdbUrl is not a valid URL</p>
      )}

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={setImdbId}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            disabled={!isFormValid}
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
