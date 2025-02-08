import { FC, useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (newMovie: Movie) => void;
}

export const NewMovie: FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [infoTitle, setInfoTitle] = useState('');
  const [infoDescription, setInfoDescription] = useState('');
  const [infoImageURL, setInfoImageURL] = useState('');
  const [infoImdbURL, setInfoImdbURL] = useState('');
  const [infoImdbID, setInfoImdbID] = useState('');

  const couldSubmit =
    infoTitle.trim() &&
    infoImageURL.trim() &&
    infoImdbURL.trim() &&
    infoImdbID.trim();

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfoTitle(event.target.value);
  };

  const handleChangeinfoDescription = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInfoDescription(event.target.value);
  };

  const handleImageURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfoImageURL(event.target.value);
  };

  const handleImdbURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfoImdbURL(event.target.value);
  };

  const handleImdbID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfoImdbID(event.target.value);
  };

  const handleSubmit = () => {
    const objMovie = {
      title: infoTitle.trim(),
      description: infoDescription.trim(),
      imgUrl: infoImageURL.trim(),
      imdbUrl: infoImdbURL.trim(),
      imdbId: infoImdbID.trim(),
    };

    onAdd(objMovie);
  };

  return (
    <form
      className="NewMovie"
      key={count}
      onSubmit={event => {
        event.preventDefault();
        handleSubmit();
        setCount(a => a + 1);
      }}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={infoTitle}
        onChange={handleChangeTitle}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={infoDescription}
        onChange={handleChangeinfoDescription}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={infoImageURL}
        onChange={handleImageURL}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={infoImdbURL}
        onChange={handleImdbURL}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={infoImdbID}
        onChange={handleImdbID}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!couldSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
