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
  const [count] = useState(0);
  // eslint-disable-next-line max-len
  const pattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$/;
  const [erorimgUrl, setErorimgUrl] = useState(true);
  const [erorimdbUrl, setErorimdbUrl] = useState(true);

  const disablet = ((title.trim() === '' || !imgUrl || !imdbUrl || !imdbId)
  && erorimgUrl && erorimdbUrl);

  const isValidUrl = (url: string) => {
    const isValid = pattern.test(url);

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (disablet && erorimgUrl) {
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
          setErorimgUrl(!isValidUrl(newValue));
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
          setErorimdbUrl(!isValidUrl(newValue));
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
