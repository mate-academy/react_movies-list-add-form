import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type NewMovieProps = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');
  const [count, setCount] = useState(0);
  // eslint-disable-next-line max-len
  const pattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@,.\w_]*)#?(?:[,.!/\\\w]*))?)$/;
  const [erorimgUrl, setErorimgUrl] = useState(false);
  const [erorimdbUrl, setErorimdbUrl] = useState(false);
  const disablet = ((title.trim() === ''
    || !imgUrl || !imdbUrl || !imdbId)
    || (!erorimgUrl || !erorimdbUrl));
  const isValidUrl = (url: string, key: string) => {
    if (pattern.test(url) && key === 'imgUrl') {
      setErorimgUrl(true);
    }

    if (pattern.test(url) && key === 'imdbUrl') {
      setErorimdbUrl(true);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disablet && erorimgUrl && erorimdbUrl) {
      return;
    }

    const newMovie = {
      title,
      description,
      imgUrl,
      imdbUrl,
      imdbId,
    };

    onAdd(newMovie);

    setTitle('');
    setDescription('');
    setImgUrl('');
    setImdbUrl('');
    setImdbId('');
    setCount(+1);
  };

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        erorimgUrl={erorimgUrl}
        erorimdbUrl={erorimdbUrl}
        name="title"
        label="Title"
        value={title}
        onChange={newValue => setTitle(newValue)}
        required
      />

      <TextField
        erorimgUrl={erorimgUrl}
        erorimdbUrl={erorimdbUrl}
        name="description"
        label="Description"
        value={description}
        onChange={newValue => setDescription(newValue)}
      />

      <TextField
        erorimgUrl={erorimgUrl}
        erorimdbUrl={erorimdbUrl}
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={newValue => {
          setImgUrl(newValue);
          isValidUrl(newValue, 'imgUrl');
        }}
        required
      />

      <TextField
        erorimgUrl={erorimgUrl}
        erorimdbUrl={erorimdbUrl}
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={newValue => {
          setImdbUrl(newValue);
          isValidUrl(newValue, 'imdbUrl');
        }}
        required
      />

      <TextField
        erorimgUrl={erorimgUrl}
        erorimdbUrl={erorimdbUrl}
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={newValue => setImdbId(newValue)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disablet}
            onClick={() => handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
