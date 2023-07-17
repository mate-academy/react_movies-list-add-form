import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

type Props = {
  onAdd: (movie: Movie) => void;
};

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [count, setCount] = useState(0);
  const [descriptionField, setDescriptionField] = useState('');
  const [titleField, setTitleField] = useState('');
  const [imgUrlField, setImgUrlField] = useState('');
  const [imdbUrlField, setImdbUrlField] = useState('');
  const [imdbIdField, setImdbIdField] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const movieToUpload = {
      title: titleField,
      description: descriptionField,
      imgUrl: imgUrlField,
      imdbUrl: imdbUrlField,
      imdbId: imdbIdField,
    };

    const reset = () => {
      setDescriptionField('');
      setTitleField('');
      setImgUrlField('');
      setImdbUrlField('');
      setImdbIdField('');
    };

    onAdd(movieToUpload);
    setCount((current) => current + 1);
    reset();
  };

  const disabled = !titleField || !imdbUrlField || !imgUrlField || !imdbIdField;

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
        value={titleField}
        onChange={(value) => setTitleField(value)}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionField}
        onChange={(value) => setDescriptionField(value)}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlField}
        onChange={(value) => setImgUrlField(value)}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlField}
        onChange={(value) => setImdbUrlField(value)}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdField}
        onChange={(value) => setImdbIdField(value)}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={disabled}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
