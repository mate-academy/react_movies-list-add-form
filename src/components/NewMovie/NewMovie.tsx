import { useState } from 'react';
import { TextField } from '../TextField';

type Movie = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

type Props = {
  onAdd: (newMovie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const isFormValid = title && imgUrl && imdbUrl && imdbId;

  const handleAddMovie = (event: React.FormEvent) => {
    event.preventDefault();

    const newMovie: Movie = {
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
    <form className="NewMovie" onSubmit={handleAddMovie}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title}
        onChange={(newValue: string) => {
          setTitle(newValue);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description}
        onChange={(newValue: string) => {
          setDescription(newValue);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl}
        onChange={(newValue: string) => {
          setImgUrl(newValue);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl}
        onChange={(newValue: string) => {
          setImdbUrl(newValue);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId}
        onChange={(newValue: string) => {
          setImdbId(newValue);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isFormValid}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
