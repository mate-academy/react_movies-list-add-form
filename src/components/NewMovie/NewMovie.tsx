import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  // Increase the count after successful form submission
  // to reset touched status of all the `Field`s
  const [title, setFilmTitle] = useState('');
  const [description, setFilmDescription] = useState('');
  const [imgUrl, setImageUrl] = useState('');
  const [imdbUrl, setImdbUrl] = useState('');
  const [imdbId, setImdbId] = useState('');

  const hasAllRequired = title && imgUrl && imdbUrl && imdbId;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasAllRequired) {
      onAdd({
        title,
        description,
        imgUrl,
        imdbUrl,
        imdbId,
      });
    }

    setFilmTitle('');
    setFilmDescription('');
    setImageUrl('');
    setImdbUrl('');
    setImdbId('');
  };

  return (
    <form
      className="NewMovie"
      onSubmit={handleSubmit}
    >
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={title.trim()}
        onChange={(event) => {
          setFilmTitle(event.target.value);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={description.trim()}
        onChange={(event) => {
          setFilmDescription(event.target.value);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrl.trim()}
        onChange={(event) => {
          setImageUrl(event.target.value);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrl.trim()}
        onChange={(event) => {
          setImdbUrl(event.target.value);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbId.trim()}
        onChange={(event) => {
          setImdbId(event.target.value);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!hasAllRequired}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
