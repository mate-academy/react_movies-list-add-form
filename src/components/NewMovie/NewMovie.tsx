import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface PropsNewMovies {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie = ({ onAdd }: PropsNewMovies) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const resetValues = () => {
    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  // eslint-disable-next-line max-len
  const pattern = new RegExp(/^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/);

  const validURL = (url: string) => {
    return pattern.test(url);
  };

  const handleImgURL = (url: string) => {
    setImgUrl(url);
  };

  const handleImdbUrl = (url: string) => {
    setImdbUrl(url);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setCount(prevCount => prevCount + 1);

    resetValues();
  };

  const isRequired = title && validURL(imgUrl) && validURL(imdbUrl) && imdbId;

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={handleSubmit}
    >
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
        onChange={handleImgURL}
        required
      />
      {!validURL(imgUrl) && imgUrl
        && (<p className="help is-danger">Check correct URL address</p>)}

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={handleImdbUrl}
        required
      />
      {imdbUrl && !validURL(imdbUrl)
        && (<p className="help is-danger">Check correct URL address</p>)}

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
            data-cy="submit-button"
            className="button is-link"
            disabled={!isRequired}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
