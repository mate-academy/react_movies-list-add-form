import { useState } from 'react';
import { TextField } from '../TextField';
import { Movie } from '../../types/Movie';

interface Props {
  onAdd: (movie: Movie) => void;
}

export const NewMovie: React.FC<Props> = ({ onAdd }) => {
  const [formKeyCount, setFormKeyCount] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imgUrlValue, setImgUrlValue] = useState('');
  const [imdbUrlValue, setImdbUrlValue] = useState('');
  const [imdbIdValue, setImdbIdValue] = useState('');

  const isVerify = titleValue && imgUrlValue && imdbUrlValue && imdbIdValue;

  const reset = () => {
    setTitleValue('');
    setDescriptionValue('');
    setImgUrlValue('');
    setImdbUrlValue('');
    setImdbIdValue('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isVerify) {
      onAdd({
        title: titleValue,
        description: descriptionValue,
        imgUrl: imgUrlValue,
        imdbUrl: imdbUrlValue,
        imdbId: imdbIdValue,
      });
      reset();
      setFormKeyCount(() => formKeyCount + 1);
    }
  };

  return (
    <form className="NewMovie" key={formKeyCount} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      <TextField
        name="title"
        label="Title"
        value={titleValue}
        onChange={newTitle => {
          setTitleValue(newTitle);
        }}
        required
      />

      <TextField
        name="description"
        label="Description"
        value={descriptionValue}
        onChange={newDescription => {
          setDescriptionValue(newDescription);
        }}
      />

      <TextField
        name="imgUrl"
        label="Image URL"
        value={imgUrlValue}
        onChange={newImageURL => {
          setImgUrlValue(newImageURL);
        }}
        required
      />

      <TextField
        name="imdbUrl"
        label="Imdb URL"
        value={imdbUrlValue}
        onChange={newimdbUrl => {
          setImdbUrlValue(newimdbUrl);
        }}
        required
      />

      <TextField
        name="imdbId"
        label="Imdb ID"
        value={imdbIdValue}
        onChange={newimdbId => {
          setImdbIdValue(newimdbId);
        }}
        required
      />

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!isVerify}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
